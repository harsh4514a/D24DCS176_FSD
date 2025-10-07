import mongoose from 'mongoose';

const connectDB = async (DB_URL) => {

    try {
        await mongoose.connect(DB_URL);
        console.log('DB Connected');
    } catch (error) {
        console.error('Could not connect to the Database!', error);
        process.exit(1); // Exit process on connection failure
    }
}

export default connectDB;