import { FaCopy } from "react-icons/fa";
import { useState } from "react";

function ResultCard({ letter }) {
    const[copied, setCopied] = useState(false);

    function copyText(){
        navigator.clipboard.writeText(letter);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return(
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-2xl text text-cyan-300">Generated Letter</h2>
                <div className = "relative">
                    {copied && (
                        <span className="absolute -top-10 right-0 bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap">
                            link Copied!
                        </span>
                    )}
                    <FaCopy onClick={copyText} className="text-2xl text-gray-300 hover:text-cyan-400 cursor-pointer transition" />

                </div>
            </div>
            <pre className="whitespace-pre-wrap bg-[#050A18] p-6 rounded-xl text-gray-200 border border-gray-700 h-125 overflow-y-auto">{letter}</pre>
        </div>
    );
}

export default ResultCard;
