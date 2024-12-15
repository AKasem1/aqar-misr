import Article from "@/pages/models/Article";
import mongoose from "mongoose";


const handler = async (req, res) => {
  const { articleId } = req.query;
  console.log("articleId: ", articleId)
  try {
    if (req.method === "GET") {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to MongoDB");

      const article = await Article.findOne({_id: articleId})

      res.status(200).json({message: "article requests retrieved successfully.", data: article});
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  } 
};

export default handler;
