import { Request, Response } from 'express';
import PlantsService from '../service/PlantsService';

class PlantController {
	async getAllPlants(req: Request, res: Response) {
		try {
			const result = await PlantsService.getAllPlants();
			if ("error" in result) {
				res.status(404).send(result);
			} else {
				res.status(200).send(result);
			}
		} catch (error) {
			console.error(`Error occurred: ${error}`);
			res.status(500).send({ "error": error });
		}
	}

	async getPlantById(req: Request, res: Response) {
		try {
			const result = await PlantsService.getPlantById(req.params.id);
			if ("error" in result) {
				res.status(404).send(result);
			} else {
				res.status(200).send(result);
			}
		} catch (error) {
			console.error(`Error occurred: ${error}`);
			res.status(500).send({ "error": error });
		}
	}

	async getPlantByUserId(req: Request, res: Response) {
		try {
			const result = await PlantsService.getPlantByUserId(req.params.userId);
			if ("error" in result) {
				res.status(404).send(result);
			} else {
				res.status(200).send(result);
			}
		} catch (error) {
			console.error(`Error occurred: ${error}`);
			res.status(500).send({ "error": error });
		}
	}

	async createPlant(req: Request, res: Response) {
		try {
			const plant = req.body;
			const result = await PlantsService.createPlant(plant);
			res.status(201).send(result);
		} catch (error) {
			console.error(`Error occurred: ${error}`);
			res.status(500).send({ "error": error });
		}
	}

	async updatePlant(req: Request, res: Response) {
		try {
			const plant = req.body;
			const result = await PlantsService.updatePlant(req.params.id, plant);
			res.status(200).send(result);
		} catch (error) {
			console.error(`Error occurred: ${error}`);
			res.status(500).send({ "error": error });
		}
	}

	async deletePlant(req: Request, res: Response) {
		try {
			const result = await PlantsService.deletePlant(req.params.id);
			res.status(200).send(result);
		} catch (error) {
			console.error(`Error occurred: ${error}`);
			res.status(500).send({ "error": error });
		}
	}
}

export default new PlantController();