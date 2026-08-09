
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import multer from 'multer';
//import { createRequire } from 'module';
import pkg from 'pdf-parse';
const pdfParse = pkg;

//const require = createRequire(import.meta.url);
//const pdfParse = require('pdf-parse').default || require('pdf-parse');



dotenv.config();
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const upload = multer({ storage:multer.memoryStorage()});


const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY,
 });
app.post('/api/upload-resume', upload.single('resume'), async(req,res) => {
    try{
        const data = await pdfParse(req.file.buffer);
        res.json({ resumeText: data.text });
    }catch(err){
        console.error("Resume parse error: ", err);
        res.status(500).json({ error:'Failed to parse resume' });
    }
});

app.post('/api/generate', async(req,res) =>{
    try{
        const{ name, jobRole, company, skills, resumeText } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-flash-lite-latest",
            contents: `Write a professional 3 paragraph cover letter for ${name} appliying for ${jobRole} position at
            ${company}. Skill: ${skills}, keep it under 200 words. ${resumeText ? `Use the following content to personalize the letter with relevant experience:\n${resumeText}`:""}`
        });
        const letter = response.text;

        res.json({ letter });
        
    }catch(error){
        console.log("Error: ",error);
        res.status(500).json({ error:error.message});
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
     console.log(`Server running on port ${PORT}`);
});
        

