import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
    try {
      if(req.method === 'POST'){
        const client = await MongoClient.connect(process.env.MONGO_URL);
        const db = client.db();
        const articlesCollection = db.collection('articles');

        const {title, image, paragraphs} = req.body

        console.log("Article info", title, image, paragraphs)

        if (!title || !image || !paragraphs) {
            throw Error('يجب ملئ جميع البيانات');
          }

        if (paragraphs.length == 0) {
            throw Error('لا يمكن أن يكون المقال فارغ');
        }

        
        const article = await articlesCollection.insertOne({title, image, paragraphs})

        client.close(); 
        console.log('Article Added Successfully..');
        res.status(201).json({ article, message: "تم إضافة المقال بنجاح" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ message: error.message });
    }
  };

  export default handler;