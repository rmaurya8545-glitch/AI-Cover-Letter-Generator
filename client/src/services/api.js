export async function generateCoverLetter(formData){
    const res = await fetch('http://localhost:3000/api/generate',{
        method:'POST',
        headers:{ 'Content-Type':'application/json'},
        body:JSON.stringify(formData)
    });
    return res.json();
};
