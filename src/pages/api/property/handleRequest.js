import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
    try {
      if(req.method === 'POST'){
        const {accept, id} = req.body
        console.log("accept? ", accept)
        const client = await MongoClient.connect(process.env.MONGO_URL);
        const db = client.db();
        const propertiesCollection = db.collection('properties');
        const property = await propertiesCollection.findOne({ _id: new ObjectId(id) });
        console.log(property)
        if (!property) {
            client.close();
            return res.status(404).json({ message: "العقار غير موجود" });
          }
    
          const updateResult = await propertiesCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { accepted: accept ? 'accepted' : 'rejected' } }
          );
    
          client.close();
    
          if (updateResult.modifiedCount > 0) {
            return res.status(201).json({
              property: { ...property, accepted: accept ? 'accepted' : 'rejected' },
              message: accept ? "تم قبول طلب العقار بنجاح" : "تم رفض طلب العقار بنجاح",
            });
          } else {
            return res.status(500).json({ message: "Failed to update the property" });
          }
        } else {
          return res.status(405).json({ message: "Method Not Allowed" });
        }
      } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: error.message });
      }
    };

  export default handler;