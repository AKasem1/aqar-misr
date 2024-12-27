import Property from "@/pages/models/Property";
import mongoose from "mongoose";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to MongoDB");

      const { query } = req.query;

      let properties;
      if (query) {
        properties = await Property.find({
          $and: [
            { accepted: "accepted" },
            {
              $or: [
                { city: { $regex: query, $options: "i" } },
                { propertyName: { $regex: query, $options: "i" } },
                { propertyDescription: { $regex: query, $options: "i" } },
              ],
            },
          ],
        })
          .populate("addedBy", "fullName phone")
          .exec();
      } else {
        properties = await Property.find({ accepted: "accepted" })
          .populate("addedBy", "fullName phone")
          .exec();
      }

      res.status(200).json({ message: "Properties retrieved successfully.", data: properties});
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
};

export default handler;
