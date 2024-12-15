import * as bcrypt from 'bcrypt';
import * as validator from 'validator';
import createToken from '@/pages/util/createToken';
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { email, password, fullName, phone, type } = req.body;

      if (!email || !password || !fullName || !phone || !type) {
        throw Error('يجب إدخال جميع البيانات');
      }

      if(type != 'admin' && type != 'employee'){
        throw Error('يجب أن يكون النوع أدمن أو موظف');
      }

      if (!validator.isEmail(email)) {
        throw Error('البريد الإلكتروني غير صحيح');
      }

      const client = await MongoClient.connect(process.env.MONGO_URL);
      const db = client.db();
      const adminsCollection = db.collection('admins');

      const existingAdmin = await adminsCollection.findOne({ email });
      if (existingAdmin) {
        throw Error('هذا البريد الإلكتروني مسجل بالفعل');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = {
        email,
        password: hashedPassword,
        fullName,
        phone,
        type,
        createdAt: new Date(),
      };

      const result = await adminsCollection.insertOne(newAdmin);

      const token = createToken(result.insertedId);

      client.close();

      console.log('Admin added successfully');
      res.status(201).json({ message: 'تم إضافة الادمن بنجاح', admin: newAdmin, token });
    } else {
      res.status(405).json({ message: 'الطريقة غير مسموح بها' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
};

export default handler;
