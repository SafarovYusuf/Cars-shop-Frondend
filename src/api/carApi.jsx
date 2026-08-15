// carApi.js
import axios from "axios";

const baseDomain = "http://localhost:5001/api/v1/cars";

const carApi = axios.create({
  baseURL: baseDomain,
  headers: { "X-Custem-Header": "foobar" },
});

class CarService {
  // ------------------- Get All Cars  --------------------------
  async getAllCars(params) {
    try {
      const res = await carApi.get("/", { params });
      return res.data;
    } catch (err) {
      return (
        err.response?.data || {
          success: false,
          message: "Ma'lumotlarni olishda xatolik",
        }
      );
    }
  }

  // ------------------- Get One Car -------------------
  async getOneCar(id) {
    try {
      const res = await carApi.get(`/${id}`);
      return res.data;
    } catch (err) {
      return (
        err.response?.data || {
          success: false,
          message: "Mashinani olishda xatolik",
        }
      );
    }
  }

  // ------------------- Create Car -------------------
  async createCar(carData) {
    try {
      const res = await carApi.post("/", carData);
      return res.data;
    } catch (err) {
      return (
        err.response?.data || {
          success: false,
          message: "Mashina qo'shishda xatolik",
        }
      );
    }
  }

  // ------------------- Delete Car -------------------
  async deleteCar(id) {
    try {
      const res = await carApi.delete(`/${id}`);
      return res.data;
    } catch (err) {
      return (
        err.response?.data || {
          success: false,
          message: "Mashina o'chirishda xatolik",
        }
      );
    }
  }

  // ------------------- Update Car -------------------
  async updateCar(id, carData) {
    try {
      const res = await carApi.put(`/${id}`, carData);
      return res.data;
    } catch (err) {
      return (
        err.response?.data || {
          success: false,
          message: "Mashina yangilashda xatolik",
        }
      );
    }
  }
}

export default new CarService();
