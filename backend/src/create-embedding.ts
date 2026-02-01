import { connectDB } from './db';
import { getEmbedding } from './get-embeddings';
import { attemtQuestionsModel, QuestionModel } from './Schema';

async function run() {
    try {
         await connectDB();
        const batchSize = 2;
        const documents = await attemtQuestionsModel.find({ embedding: { $exists: false } }).limit(batchSize);
        const updateDocuments: any[] = [];

        await Promise.all(
            documents.map(async (doc:any) => {
                const tags = Array.isArray(doc.tags) ? doc.tags.join(" ") : "";
                const text = `question:${doc.question } ,tags:${tags}, Status: ${doc.status } user answer: ${doc.userAnswer} .`;

                try {
                    const embedding = await getEmbedding(text);

                    updateDocuments.push({
                        updateOne: {
                            filter: { _id: doc._id },
                            update: { $set: { embedding } },
                        },
                    });
                } catch (err: any) {
                }
            })
        );

        if (updateDocuments.length > 0) {
            const collection = attemtQuestionsModel.collection;
            await collection.bulkWrite(updateDocuments, { ordered: false });
        }
    } catch (err: any) {
    }
}

setInterval(()=>{run().catch(console.dir)},60000);
