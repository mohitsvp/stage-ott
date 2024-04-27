import { Request, Response } from "express";
import UserModel from "../models/user.model";

interface RequestWithUser extends Request {
  token?: any;
}

const addToMyList = async (req: RequestWithUser, res: Response) => {
  try {
    const { itemId, kind } = req.body;
    await UserModel.findOneAndUpdate(
      { _id: req.token.userId },
      { $addToSet: { myList: { kind, item: itemId } } },
      { new: true }
    );
    return res.status(200).send({ message: "Item added to list" });
  } catch (error) {
    console.log("Error adding data to list: ", error);
    return res.status(500).send({ message: "Error adding data to list" });
  }
};

const removeFromMyList = async (req: RequestWithUser, res: Response) => {
  try {
    const { itemId, kind } = req.body;
    await UserModel.findOneAndUpdate(
      { _id: req.token.userId },
      { $pull: { myList: { kind, item: itemId } } },
      { new: true }
    );
    return res.status(200).send({ message: "Item removed from list" });
  } catch (error) {
    console.log("Error removing data from list: ", error);
    return res.status(500).send({ message: "Error removing data from list" });
  }
};

const listMyItems = async (req: RequestWithUser, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
  
      const user = await UserModel.findById(req.token.userId);
  
      if (!user) {
          return res.status(404).send({ message: "User not found" });
      }
  
      const paginatedList = user.myList.slice(skip, skip + limit);
  
      for (let listItem of paginatedList) {
        if (listItem.kind === "Movie") {
          await UserModel.populate(user, {
            path: "myList.item",
            model: "Movie",
          });
        } else if (listItem.kind === "TVShow") {
          await UserModel.populate(user, {
            path: "myList.item",
            model: "TVShow",
          });
        }
      }
      return res.status(200).send({ list: paginatedList });
    } catch (error) {
      console.log("Error getting data from list: ", error);
      return res.status(500).send({ message: "Error getting data from list" });
    }
  };

export { addToMyList, removeFromMyList, listMyItems };
