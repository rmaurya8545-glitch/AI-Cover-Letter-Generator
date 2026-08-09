export async function generateCoverLetter(formData){
    const res = await fetch('https://ai-cover-letter-generator-ceqg.onrender.com/api/generate',{
        method:'POST',
        headers:{ 'Content-Type':'application/json'},
        body:JSON.stringify(formData)
    });
    return res.json();
};
