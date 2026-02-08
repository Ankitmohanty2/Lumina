async function getQuote(){
    try{
        const apiKey = process.env.API_NINJAS_KEY;
        if (!apiKey) throw new Error("API_NINJAS_KEY is not set in environment");
        const res = await fetch('https://api.api-ninjas.com/v2/randomquotes?categories=education,inspirational',{
            method:'GET',
            headers:{
               'X-Api-Key': apiKey,
                'Content-Type':"application/json"
            }
        })
        const data = await res.json();
    }
    catch{
        
    }
}
getQuote();

