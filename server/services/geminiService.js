
const {GoogleGenerativeAI} = require ('@google/generative-ai');

const ai  = new GoogleGenerativeAI(
    process.env.RESUME_API_KEY
);

const model = ai.getGenerativeModel({
    model  : 'gemini-2.5-flash'
});

module.exports = model;