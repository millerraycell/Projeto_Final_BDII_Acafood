import {Router} from 'express'
import multer from 'multer';

import FoodController from './Controllers/FoodController';
import UserController from './Controllers/UserController';

const routes = Router();

routes.post("/mongo/create", FoodController.create)
routes.get("/mongo/show", FoodController.index)
routes.put("/mongoedit/:id", FoodController.update)
routes.delete("/mongodel/:id", FoodController.delete)

routes.post("/mongo/users/create", UserController.create);
export default routes;