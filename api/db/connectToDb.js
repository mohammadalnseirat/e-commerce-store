import mongoose from "mongoose"

const connectToDb = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URL)
        console.log('Connecting to db', connection.connection.host)
    } catch (error) {
        console.log('Error while connecting to db', error)
        process.exit(1)
        
    }
}
 

export default connectToDb