const fs = require('fs');
const pdfParse = require('pdf-parse-fixed');
const pool = require('../config/db');
const model = require('../services/geminiService');

const uploadResume = async (req, res) => {
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
  
};

const getHistory = async (req, res) => {
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

};

const getAnalysisById = async (req, res) => {
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
};

module.exports = {
    uploadResume,
    getHistory,
    getAnalysisById
};