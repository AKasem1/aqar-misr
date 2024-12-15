import * as jwt from 'jsonwebtoken';

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '1d'})
}

export default createToken;