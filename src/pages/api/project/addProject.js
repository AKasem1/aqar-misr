import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
    try {
      if(req.method === 'POST'){
        const client = await MongoClient.connect(process.env.MONGO_URL);
        const db = client.db();
        const projectsCollection = db.collection('projects');

        const {title, image, description, address, propertiesCount} = req.body

        console.log("project info", title, image, description, address, propertiesCount)

        if (!title || !image || !description || !address || !propertiesCount) {
            throw Error('يجب ملئ جميع البيانات');
          }
        
        const project = await projectsCollection.insertOne({title, image, description, address, propertiesCount})

        client.close(); 
        console.log('project Added Successfully..');
        res.status(201).json({ project, message: "تم إضافة المشروع بنجاح" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ message: error.message });
    }
  };

  export default handler;