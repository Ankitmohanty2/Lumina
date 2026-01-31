import dotenv from 'dotenv'
import { VoyageAIClient } from 'voyageai';
dotenv.config();

const client = new VoyageAIClient({apiKey: process.env.VOYAGE_API_KEY});

export async function getEmbedding(text:string) {
    const results = await client.embed({
        input: text,
        model: "voyage-3"
    });

    const data = results.data;
    if (!data?.[0]) throw new Error("Embedding response missing data");
    return data[0].embedding;
}
