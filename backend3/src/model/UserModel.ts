import {Document, Schema, model} from 'mongoose';

interface User extends Document{
    name: string,
    senha: string
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },

    senha:{
        type: String,
        required: [true, 'Password field is required']
    }
})

export default model<User>('User', UserSchema);