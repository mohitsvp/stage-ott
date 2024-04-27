import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema(
    {
        name : {type : String, required : true},
    },
    {
        versionKey : false,
        timestamps : true
    }
)

export default mongoose.model('Genre', GenreSchema);