import mongoose from "mongoose";
import dotenv from 'dotenv/config';

const connectDb = async () => {
    try {
        const db = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dfabo5f.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MONGODB conectado en :${url}`)
    } catch (error) {
        console.log(`error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDb;