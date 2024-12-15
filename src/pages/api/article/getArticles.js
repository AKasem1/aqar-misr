import Article from "@/pages/models/Article";
import mongoose from "mongoose";


const handler = async (req, res) => {

  try {
    if (req.method === "GET") {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to MongoDB");

      const articles = await Article.find()

      res.status(200).json({message: "articles requests retrieved successfully.", data: articles});
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  } 
};

export default handler;
