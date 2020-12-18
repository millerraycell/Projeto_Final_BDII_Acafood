import {Request, Response} from 'express';
import Food from '../model/FoodModel';

export default{
    async create (request: Request, response: Response){
        const {
            name,
            type,
            origin,
        } = request.body;

        console.log(request.body);

        await Food.create({
            name,
            type,
            origin,
        }).then(function(data){
            return response.status(201).send(data)
        })
    },

    async index(request: Request, response: Response){
        await Food.find()
            .then(function(data){
                return response.status(200).send(data)
        })
    },

    async update(request: Request, response: Response){
        const dados = request.body;
        const id = request.params.id;

        await Food.findByIdAndUpdate(id, dados)
            .then(function(old_movie){
                Food.findOne({_id: request.params.id})
                    .then(function(new_movie){
                        return response.status(200).send(new_movie);
            })
        })
    },

    async delete(request: Request, response: Response){
        return await Food.findByIdAndRemove({_id: request.params.id}).then((movie)=>{
            response.send(movie);
        })
    }
}