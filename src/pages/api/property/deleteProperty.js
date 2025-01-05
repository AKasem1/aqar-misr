import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
    try {
      if(req.method === 'DELETE'){
        const { id } = req.body;
        console.log("ID for deleted property", id);
        const client = await MongoClient.connect(process.env.MONGO_URL);
        console.log(process.env.MONGO_URL)
        const db = client.db();
        const propertiesCollection = db.collection('properties');
        await propertiesCollection.deleteOne({_id: new ObjectId(id)});
        client.close(); 
        console.log('Property Deleted Successfully..');
        res.status(200).json({ message: "تم حذف العقار بنجاح" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ message: error.message });
    }
  };

  export default handler;