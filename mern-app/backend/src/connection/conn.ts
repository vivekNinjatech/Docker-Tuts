import mongoose from 'mongoose';

export const connection = async () => {
    const path = process.env.MONGODB_PATH;
    if (path !== undefined && path.length > 0) {
        try {
            await mongoose.connect(path);
            console.log('Database connected 👍');
        } catch (error) {
            console.log('Somthing went wrong while connecting with db: ', error);
            process.exit(1);
        }
    } else {
        console.log("no mongodb path found!");
    }
}