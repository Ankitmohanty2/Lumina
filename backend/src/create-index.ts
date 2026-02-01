    import { attemtQuestionsModel, QuestionModel } from './Schema';
    import { connectDB } from './db';

    async function run() {
    try {
        await connectDB();

        const index = {
            name: "vector_index",
            type: "vectorSearch",
            definition: {
            "fields": [
                {
                "type": "vector",
                "path": "embedding",
                "similarity": "dotProduct",
                "numDimensions": 1024
                }
            ]
            }
        }

        await attemtQuestionsModel.createSearchIndex(index);
    } catch(e){
    }
    }
    run().catch(console.dir);
