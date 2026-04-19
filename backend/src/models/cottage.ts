import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'

const cottageSchema = new mongoose.Schema(
    {
        name : String,
        price : Number,
        owner : String,
        location : String,
        isReserved : Boolean,
        start : String,
        end : String,
        images : [String],
        phone : String
    }
);

export default mongoose.model('CottageM', cottageSchema, 'cottage');