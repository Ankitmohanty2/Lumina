import { getEmbedding } from './get-embeddings';
import { connectDB } from './db';
import { attemtQuestionsModel } from './Schema';

async function run(prompt:string) {
    try {
        await connectDB();

        const collection = attemtQuestionsModel.collection

        const queryEmbedding = await getEmbedding(prompt);

        const pipeline = [
            {
                $vectorSearch: {
                    index: "vector_index",
                    queryVector: queryEmbedding,
                    path: "embedding",
                    exact: true,
                    limit: 5
                }
            },
            {
                $project: {
                    _id: 0,
                    question: 1,
                    tags: 1,
                    score: { $meta: "vectorSearchScore" }
                }
            }
        ];

        const result = collection.aggregate(pipeline);

        for await (const doc of result) {
            console.log("doc: ",doc);
        }
        
    } finally {
        console.log("finally ")
    }
}