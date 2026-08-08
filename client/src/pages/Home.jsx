import React, { useState } from "react";
import CoverLetterForm from "../components/CoverLetterForm";
import ResultCard from "../components/ResultCard";
import { generateCoverLetter } from "../services/api";
import { FileText } from 'lucide-react';

function Home(){
    const[letter, setLetter] = useState("");
    const[loading, setLoading] = useState(false);


    async function makeLetter(data) {
        setLoading(true);
        setLetter("Generating...");
        try{
            const response = await generateCoverLetter(data);
            setLetter(response.letter);
        }catch(error){
            setLetter("Error: Failed to connect to the server.");
        }
        setLoading(false);
    }

    return (
        <div  className="min-h-screen bg-[#020617] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.3),rgba(255,255,255,0))]text-white px-4 py-6 md:px-8 p-6 lg:p-12">
            <div className="flex items-center justify-center gap-2 shrink-0 mb-2">
                <h1 className="text-3xl md:text-5xl font-serif lg:text-6xl font-extrabold mb-3 text-center bg-linear-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    Cover Letter Generator
                </h1>
                <FileText className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            </div>
                <p className="text-gray-500 font-serif italic text-shadow-lg text-base text-center max-w-2xl-auto mb-10 leading-relaxed">
                    Craft Personalized, professional cover letter in seconds.
                </p>
            

            <div className="flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">

                <div className="w-full md:w-1/2 bg-[#0A1128]/80 backdrop-blur-2xl p-8 rounded-2xl border border-cyan-500/30 shadow-[0_0_50px_rgba(56,189,248,0.15)]">
                    <CoverLetterForm onGenerate={makeLetter} />
                </div>

                <div className="w-full md:w-1/2 bg-[#0A1128]/80 backdrop-blur-2xl p-8 rounded-2xl border border-cyan-500/30 shadow-[0_0_50px_rgba(56,189,248,0.15)]">
                {letter? (
                    <ResultCard letter={letter} />
                ):(
                    <div className="text-center text-gray-300 flex-col items-center justify-center h-full">
                        <p className="text-6xl mb-4">✨</p>
                        <p className="text-lg">Your generated letter will appear here</p>
                    </div>
                )}
                </div>


            </div>
        </div>   
    );
}


export default Home;