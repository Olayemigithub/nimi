import { sign } from 'jsonwebtoken';

const generateToken = (id) => {
    return sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export default generateToken;
