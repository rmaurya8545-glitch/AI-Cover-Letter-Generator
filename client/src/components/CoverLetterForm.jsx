
import { useState } from "react";

function CoverLetterForm({ onGenerate,loading }) {
    const [formData, setFormData]= useState({
        name:"",
        jobRole:"",
        company:"",
        skills:"",
        resumeText:"" 
    });
     

    const [resumeName, setResumeName] = useState("");
    const [extracting, setExtracting] = useState(false);


    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setFormData({...formData,[name]:value });
    }

    

    async function handleResumeUpload(event){
        const file = event.target.files[0];
        if(!file)return;

        if(file.type!=="application/pdf"){
            alert("Currently, only PDF resume are supported");
            return;
        }

        setResumeName(file.name);
        setExtracting(true);

        try{
            const fd = new FormData();
            fd.append("resume",file);

            const res = await fetch("http://localhost:3000/api/upload-resume",{
                method:"POST",
                body:fd
            });

            if(!res.ok) throw new Error("⚠️ Upload failed!");

            const data = await res.json();
            setFormData(prev => ({...prev,resumeText:data.resumeText}));
        }catch(err){
            console.error(err);
            alert("An error occurred while parsing the resume. Please try again.");

            setResumeName("");
            setFormData(prev => ({...prev, resumeText:""}));
            event.target.value = "";
        }finally{
            setExtracting(false);
        }
    }

    function handleSubmit(event){
        event.preventDefault(); 
        onGenerate(formData); 
    }

    const input = "w-full p-3 bg-gray-800 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none shadow-inner transition-all";

    return(
        <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-2xl font-bold mb-4 text-cyan-300">Enter Details</h2>
            <input name="name" value={formData.name}onChange={handleChange} placeholder="Enter your Name" className={input} required />
            <input name="jobRole" value={formData.jobRole} onChange={handleChange} placeholder = "Job Role e.g. React Developer" className={input} required />
            <input name="company" value={formData.company} onChange={handleChange} placeholder ="Target Company" className={input} required />
            <textarea name="skills" value={formData.skills} onChange={handleChange} placeholder = "Key Skills,comma separated" className={input} required />

            <div className="space-y-2">
                <label className="w-full p-6 border-2 border-dashed bg-gray-800  hover:bg-gray-700 hover:border-cyan-300 text-cyan-300 font-semibold rounded-lg cursor-pointer text-center block transition">
                    <input
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                    className="hidden" 
                    />
                    {extracting?(
                        <span classname="flex flex-col items-center gap-2">
                            <div className="w-6 h-6 border-4 border-cyan-300 border-t-transparant rounded-full animate-spin"></div>
                            <span>The Resume is being Uploaded...</span>
                        </span>
                    ):resumeName ?(
                        <span className="text-gray-300"> Uploaded: {resumeName}</span>
                    ):(
                        <span>📄 Click to upload Resume</span>                    
                    )}
                </label>
            </div>
            <div className="flex justify-end pt-2">
                <button type="submit" disabled={loading} className="bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 cursor-pointer transition-all">
                {loading? 'Generating...' :'Generate Letter'}
                </button>
            </div>
        </form>
    );
}

export default CoverLetterForm;
