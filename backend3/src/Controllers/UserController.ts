import {Request, Response} from 'express';
import User from '../model/UserModel';

export default{
    async create(request:Request, response: Response){
        const {
            name,
            senha,
        } = request.body;

        console.log(request.body);

        await User.create({
            name,
            senha
        }).then(function(data){
            return response.status(201).send(data)
        })
    }
}