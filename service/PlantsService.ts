import PlantsDAO from "../dao/PlantsDAO";

class PlantsService {
  async getAllPlants() {
    try {
      const result = await PlantsDAO.getAllPlants();
      if (result.length === 0) {
        return { "error": "No plants found" }
      } else {
        return result;
      }
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async getPlantById(id: string) {
    try {
      const result = await PlantsDAO.getPlantById(id);
      if (result === null) {
        console.error(`Plant not found with id: ${id}`);
        return { "error": "Plant not found" }
      } else {
        return result;
      }
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async getPlantByUserId(userId: string) {
    try {
      const result = await PlantsDAO.getPlantByUserId(userId);
      if (result === null) {
        console.error(`Plant not found with type: ${userId}`);
        return { "error": "Plant not found" }
      } else {
        return result;
      }
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async createPlant(plant: any) {
    try {
      const result = await PlantsDAO.createPlant(plant);
      return result;
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async updatePlant(id: string, plant: any) {
    try {
      const result = await PlantsDAO.updatePlant(id, plant);
      return result;
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }

  async deletePlant(id: string) {
    try {
      const result = await PlantsDAO.deletePlant(id);
      return result;
    } catch (error) {
      console.error(`Error occured: ${error}`);
      return { "error": error }
    }
  }
}

export default new PlantsService();