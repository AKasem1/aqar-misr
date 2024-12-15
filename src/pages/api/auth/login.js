import * as bcrypt from 'bcrypt';
import * as validator from 'validator';
import createToken from '@/pages/util/createToken';
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    try {
      if(req.method === 'POST'){
        const { email, password } = req.body;
      if (!email || !password) {
        throw Error('يجب إدخال جميع البيانات');
      }
      if (!validator.isEmail(email)) {
        throw Error('بيانات المستخدم غير صحيحة');
      }
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const db = client.db();
      const usersCollection = db.collection('users');
      const adminsCollection = db.collection('admins');
      const user = await usersCollection.findOne({ email });
      const admin = await adminsCollection.findOne({ email });
      if (!user && !admin) {
        throw Error('بيانات المستخدم غير صحيحة');
      }
      let match;
      if(user){
        match = await bcrypt.compare(password, user.password);
      }
      else if(admin){
        match = await bcrypt.compare(password, admin.password);
      }
      if (!match) {
        throw Error('بيانات المستخدم غير صحيحة');
      }
      client.close(); 
      if(user){
        const token = createToken(user._id);
        console.log('User Logged in Successfully..');
        res.status(201).json({ user, token });
      }
      else if(admin){
        const token = createToken(admin._id);
        console.log('Admin Logged in Successfully..');
        res.status(201).json({ user: admin, token });
      }

      }
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ message: error.message });
    }
  };

  export default handler;