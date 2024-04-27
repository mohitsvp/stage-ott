import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  username: string;
  password: string;
  checkPassword(password: string): Promise<boolean>;
}

interface IUserModel extends IUser, Document {}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
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

UserSchema.pre("save", async function (this: IUserModel, next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.checkPassword = function (this: IUserModel, password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUserModel>("User", UserSchema);
