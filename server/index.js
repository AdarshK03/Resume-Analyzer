const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse-fixed');
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

app.post('/upload', upload.single('resume'), async (req, res) => {
    try {
        const filePath = req.file.path;

        const dataBuffer = fs.readFileSync(filePath);

        const data = await pdfParse(dataBuffer);

        let text = data.text;

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

        if (!text || text.length < 20) {
            return res.json({
                message: "Could not extract text. Please upload a proper resume PDF."
            });
        }

        const aiResponse = result.response.text();

        const cleanedResponse = aiResponse
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();
        
        const analysis = JSON.parse(cleanedResponse);
    
        console.log(analysis);

        // console.log("TEXT LENGTH:", text.length);
        // console.log("RAW TEXT:", text.slice(0, 300));

        res.json(analysis);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error processing file",
            error: error.message
        });
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
