import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema(
    {
        tourist : String,
        price : Number,
        people : Number,
        start : Date,
        end : Date,
        name : String,
        location : String,
        owner : String,
        pending : String,
        reserved : Date
    }
);

export default mongoose.model('ReservationM', reservationSchema, 'reservation');