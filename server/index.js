const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse-fixed');

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

        if (!text || text.length < 20) {
            return res.json({
                message: "Could not extract text. Please upload a proper resume PDF."
            });
        }

        console.log("TEXT LENGTH:", text.length);
        console.log("RAW TEXT:", text.slice(0, 200));

        res.json({
            message: "Text extracted",
            text: text.substring(0, 500)
        });

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
    res.send("it works!!");
})
const port = 5000;
app.listen(port, () => {
    console.log(`server running on ${port}`);
})