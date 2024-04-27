import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    genres: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Genre'
    }],
    releaseDate: Date,
    director: String,
    actors: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Movie", MovieSchema);
