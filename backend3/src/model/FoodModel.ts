import {Document, Schema, model} from 'mongoose';

interface Food extends Document{
    name: string,
    type: [string],
    origin: string,
}

const FoodSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },

    type:{
        type: Array,
        required: [true, 'Types field is required']
    },

    origin:{
        type: String,
        required: [true, 'Origin field is required']
    },
})

export default model<Food>('Food', FoodSchema);