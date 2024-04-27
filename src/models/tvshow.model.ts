import mongoose from "mongoose";

const EpisodeSchema = new mongoose.Schema({
  episodeNumber: Number,
  seasonNumber: Number,
  releaseDate: Date,
  director: String,
  actors: [String],
});

const TVShowSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
  episodes: [EpisodeSchema],
});

export default mongoose.model("TVShow", TVShowSchema);
