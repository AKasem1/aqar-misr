import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    try {
      if(req.method === 'POST'){
        const client = await MongoClient.connect(process.env.MONGO_URL);
        console.log(process.env.MONGO_URL)
        const db = client.db();
        const propertiesCollection = db.collection('properties');

        const {
            propertyName,
            propertyType,
            propertyDescription,
            currentPrice,
            image,
            seller,
            propertyGroup,
            propertyBuilding,
            propertyNumber,
            propertyArea,
            bathrooms,
            rooms,
            // location,
            city,
            hasKitchen,
            hasGarden,
            hasElevator,
            hasCameras,
            hasMeters,
            hasHeating,
            hasAC,
            installmentAmount,
            installmentYears,
            upfrontCash,
            isFurnished,
            contractType,
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
        if (!seller) {
            throw Error('يجب إضافة بيانات البائع');
        }
        // if (!location) {
        //     throw Error('يجب إضافة موقع العقار');
        // }
        if (!city) {
            throw Error('يجب إضافة مدينة العقار');
        }
        if (!propertyGroup) {
            throw Error('يجب إضافة جمعية العقار');
        }
        if (!propertyBuilding) {
            throw Error('يجب إضافة بناية العقار');
        }
        if (!propertyNumber) {
            throw Error('يجب إضافة رقم العقار');
        }
        
        if (currentPrice < 0 || propertyArea < 0 || bathrooms < 0 || rooms < 0) {
            throw Error('غير مسموح بالقيم السالبة');
        }

        if (contractType === 'تمليك') {
            if (!installmentAmount || !installmentYears || !upfrontCash) {
                throw Error('يجب إضافة كافة البيانات المطلوبة');
            }
        }

        console.log("seller: ", seller)

        // Create base property object without installment fields
        const propertyData = {
            propertyName,
            propertyType,
            propertyDescription,
            image,
            currentPrice,
            propertyArea,
            bathrooms,
            rooms,
            // location,
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
            seller,
            propertyGroup,
            propertyBuilding,
            propertyNumber
        };

        if (contractType === 'تمليك') {
            Object.assign(propertyData, {
                installmentAmount,
                installmentYears,
                upfrontCash
            });
        }

        const property = await propertiesCollection.insertOne(propertyData);

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