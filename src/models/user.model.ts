import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    preferences: {
      favoriteGenres: [String],
      dislikedGenres: [String],
    },
    watchHistory: [
      {
        contentId: String,
        watchedOn: Date,
        rating: Number,
      },
    ],
    myList: [
      {
        kind: String,
        item: { type: mongoose.Schema.Types.ObjectId, refPath: "myList.kind" },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export default mongoose.model('User', UserSchema);