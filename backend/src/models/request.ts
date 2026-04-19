import mongoose from 'mongoose'

const reqSchema = new mongoose.Schema(
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
    }
);

export default mongoose.model('ReqModel', reqSchema, 'requests');