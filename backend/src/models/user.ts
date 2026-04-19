import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        firstname: String,
        lastname: String,
        gender: String,
        type: String,
        address: String,
        contact: String,
        email: String,
        image: String,
        card: String,   
        valid: Boolean
    }
);

export default mongoose.model('UserModel', userSchema, 'users');
