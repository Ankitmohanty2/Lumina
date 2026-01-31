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

        const result = await attemtQuestionsModel.createSearchIndex(index);
        

        console.log("result ",result);
    

    } catch(e){
        console.log(e)
    }
    }
    run().catch(console.dir);
