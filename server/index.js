const authMiddleware = require('./middleware/authMiddleware');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse-fixed');
const pool = require('./config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const {GoogleGenerativeAI} = require ('@google/generative-ai');

const ai  = new GoogleGenerativeAI(
    process.env.RESUME_API_KEY
);

const model = ai.getGenerativeModel({
    model  : 'gemini-2.5-flash'
});

const app = express();
app.use(cors());
app.use(express.json());
// storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

app.get(
    '/profile',
    authMiddleware, (req, res) =>{
        res.json({
            message : 'protected route',
            user : req.user
        });
    }
);

app.get(
    '/history',
    authMiddleware,
    async (req, res) => {
        try {
            const result = await pool.query(
                `
                SELECT *
                FROM resume_analysis
                WHERE user_id = $1
                ORDER BY created_at DESC
                `,
                [req.user.userId]
            );

            res.json(result.rows);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Could not fetch history',
                error: error.message
            });
        }
    }
);

app.post('/upload',authMiddleware, upload.single('resume'), async (req, res) => {
    try {
        const filePath = req.file.path;

        const dataBuffer = fs.readFileSync(filePath);

        const data = await pdfParse(dataBuffer);

        let text = data.text;

        
        if (!text || text.length < 20) {
            return res.json({
                message: "Could not extract text. Please upload a proper resume PDF."
            });
        }

        const result = await model.generateContent(`
            Analyze this resume.

            Evaluate according to:

            Education: 20 points
            Skills: 20 points
            Projects: 30 points
            Experience: 20 points
            Resume Structure: 10 points

            Return ONLY valid JSON.

            {
            "educationScore": 0,
            "skillsScore": 0,
            "projectsScore": 0,
            "experienceScore": 0,
            "structureScore": 0,
            "totalScore": 0,
            "strengths": [],
            "weaknesses": [],
            "improvements": []
            }

            Rules:
            - totalScore MUST be between 0 and 100
            - Use the rubric above
            - No markdown
            - No explanations
            - No code blocks

            Resume:

        ${text}
        `);

        const aiResponse = result.response.text();

        const cleanedResponse = aiResponse
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();
        
        const analysis = JSON.parse(cleanedResponse);

        await pool.query(
            `
            INSERT INTO resume_analysis
            (file_name, total_score, analysis, user_id)
            VALUES ($1, $2, $3, $4)
            `,
            [
                req.file.originalname,
                analysis.totalScore,
                JSON.stringify(analysis),
                req.user.userId
            ]
        );
    
        console.log(analysis);

        // console.log("TEXT LENGTH:", text.length);
        // console.log("RAW TEXT:", text.slice(0, 300));

        res.json(analysis);

        console.log(req.user);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error processing file",
            error: error.message
        });
    }
});

app.post('/register', async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        if( !name || !email ||!password){
            return res.status(400).json({
                message : 'all fields are required to fill'
            });
        }

        const existingUser = await pool.query(
            `SELECT *
            FROM users
            WHERE email = $1`,
            [email]
        );

        if(existingUser.rows.length > 0){
            return res.status(400).json({
                message : 'user already exists!'
            })
        };

        const hashPass = await bcrypt.hash(
            password,
            10
        );

        const result = await pool.query(
            `INSERT INTO users
            (name,email,password)
            VALUES ($1, $2, $3)
            RETURNING id,name,email`,

            [name,email,hashPass]
        );

        res.status(201).json({
            message : 'user registered successfully !',
            user : result.rows[0]
        });
    }
    catch(error){
        console.error(error);

        res.status(500).json({
            message : 'resgistration failed :(',
            error : error.message
        });
    }
});

app.post('/login', async(req,res) =>{
    try {
        const {email,password} = req.body;

        if( !email || !password){
            return res.status(400).json({
                message :'email and password required !'
            });
        }

        const result = await pool.query(
            `SELECT *
            FROM users
            WHERE email = $1`,
            [email]
        );

        if(result.rows.length === 0){
            return res.status(401).json({
                message : 'invalid credentials'
            });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(
            password, user.password
        );

        if(!isMatch){
            return res.status(401).json({
                message : 'invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email:user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        res.json({
            message : 'login successful !!',
            token
        })
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            message : 'invalid credentials',
            error : error.message
        })
    }
});

app.post('/test', (req, res) => {
    console.log(req.body);

    res.json({
        message: "hi",
        data: req.body
    });
});


app.get('/', (req, res) => {
    res.send("it worked!!");
})


app.get('/db-test', async (req, res) => {
    try {

        const result = await pool.query(
            'SELECT NOW()'
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

app.get(
    '/analysis/:id',
    authMiddleware,
    async (req, res) => {
        try {
            const { id } = req.params;

            const result = await pool.query(
                `
                SELECT *
                FROM resume_analysis
                WHERE id = $1
                AND user_id = $2
                `,
                [
                    id,
                    req.user.userId
                ]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({
                    message: 'Analysis not found'
                });
            }

            res.json(result.rows[0]);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Could not fetch analysis',
                error: error.message
            });
        }
    }
);

const port = 5000;
app.listen(port, () => {
    console.log(`server running on ${port}`);
})



app.get('/ai-test', async (req, res) => {
    try {
        const result = await model.generateContent(
            'Say hello'
        );

        res.json({
            response: result.response.text()
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
            details: error
        });
    }
});
