import express from 'express';
import PlantController from '../../controller/PlantController';

export const plantRouter = express.Router();

plantRouter.get('/get', PlantController.getAllPlants);
plantRouter.get('/get/:id', PlantController.getPlantById);
plantRouter.get('/get-by-user/:userId', PlantController.getPlantByUserId);
plantRouter.post('/create', PlantController.createPlant);
plantRouter.put('/update/:id', PlantController.updatePlant);
plantRouter.delete('/delete/:id', PlantController.deletePlant);