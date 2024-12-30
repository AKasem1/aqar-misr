import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
    try {
      if(req.method === 'POST'){
        const client = await MongoClient.connect(process.env.MONGO_URL);
        console.log(process.env.MONGO_URL)
        const db = client.db();
        const propertiesCollection = db.collection('properties');
        const userCollection = db.collection('users')

        const {
            propertyName,
            propertyType,
            propertyDescription,
            currentPrice,
            image,
            propertyArea,
            bathrooms,
            rooms,
            location,
            city,
            hasKitchen,
            hasGarden,
            hasElevator,
            hasCameras,
            hasMeters,
            hasHeating,
            hasAC,
            isFurnished,
            contractType,
            userId
        } = req.body
        

        if (!propertyName) {
            throw Error('يجب إضافة اسم العقار');
        }
        if (!propertyType) {
            throw Error('يجب إضافة نوع العقار');
        }
        if (!image) {
            throw Error('يجب رفع صورة العقار');
        }
        if (!propertyDescription) {
            throw Error('يجب إضافة وصف العقار');
        }
        if (!currentPrice) {
            throw Error('يجب إضافة السعر الحالي للعقار');
        }
        if (!propertyArea) {
            throw Error('يجب إضافة مساحة العقار');
        }
        if (!bathrooms) {
            throw Error('يجب إضافة عدد الحمامات');
        }
        if (!rooms) {
            throw Error('يجب إضافة عدد الغرف');
        }
        if (!location) {
            throw Error('يجب إضافة موقع العقار');
        }
        if (!city) {
            throw Error('يجب إضافة مدينة العقار');
        }

        if (currentPrice < 0 || propertyArea < 0 || bathrooms < 0 || rooms < 0) {
            throw Error('غير مسموح بالقيم السالبة');
        }

        const user = await userCollection.findOne({ _id: new ObjectId(userId) });
        console.log("user id: ", userId)
        console.log("user: ", user)

        if(!user){
          throw Error('هذا المستخدم غير موجود');
        }
        const property = await propertiesCollection.insertOne({
            propertyName,
            propertyType,
            propertyDescription,
            image,
            currentPrice,
            propertyArea,
            bathrooms,
            rooms,
            location,
            city,
            hasKitchen,
            hasGarden,
            hasElevator,
            hasCameras,
            hasMeters,
            hasHeating,
            hasAC,
            isFurnished,
            contractType,
            accepted: 'pending',
            addedBy: userId
        })

        client.close(); 
        console.log('Property Added Successfully..');
        res.status(201).json({ property, message: "تم إضافة العقار بنجاح" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ message: error.message });
    }
  };

  export default handler;