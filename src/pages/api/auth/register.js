import * as bcrypt from 'bcrypt';
import * as validator from 'validator';
import createToken from '@/pages/util/createToken';
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    try {
        console.log(req.method);
        if (req.method === 'POST') {
            console.log(req.body)
            const client = await MongoClient.connect(process.env.MONGO_URL);
            const db = client.db();
            const usersCollection = db.collection('users');

            const {fullName, email, password, confirmPassword, phone, type} = req.body
            
            if(!email || !password || !fullName || !phone || !confirmPassword){
                throw Error('All fields are required.')
              }
              if(!validator.isEmail(email)){
                throw Error("البريد الإلكتروني غير صحيح")
              }
              if(!validator.isStrongPassword(password)){
                throw Error("كلمة السر غير قوية")
              }
              if(password !== confirmPassword){
                throw Error("كلمة المرور غير متطابقة")
              }
                const exists = await usersCollection.findOne({email})
                if(exists){
                    throw Error("هذا البريد الإلكتروني مسجل بالفعل")
                }
    
                if(phone.length !== 11){
                    throw Error("رقم التليفون يجب أن يكون مكون من 11 رقم")
                }

                if(type != "مؤجر" && type != "مستأجر"){
                    throw Error("نوع المستخدم يجب أن يكون مؤجر أو مستأجر")
                }

                const digitsRegex = /^\d+$/;
                console.log("Is phone valid:", digitsRegex.test(phone));
                if (!digitsRegex.test(phone)) {
                console.log("Phone numbers should consist of digits only.");
                return res
                    .status(422)
                    .json({ error: "رقم التليفون يجب أن يكون مكون من أرقام فقط" });
                }
                console.log("passed type of digits test");
                if (!phone.startsWith("01")) {
                console.log("يمكنك التسجيل بأرقام مصرية فقط");
                return res
                    .status(422)
                    .json({ error: "يمكنك الحجز بأرقام مصرية فقط" });
                }            
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(password, salt)
                const user = {
                    fullName, 
                    email, 
                    password: hash, 
                    phone,
                    type,
                }
                await usersCollection.insertOne(user)
                console.log(user)
                const token = createToken(user._id)
                client.close();
                res.status(201).json({user, token, type: user.type})
        }
    } catch (error) {
        console.error(error.message)
        res.status(400).json({ message: error.message });
    }
}

export default handler;