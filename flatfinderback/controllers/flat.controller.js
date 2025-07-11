import {
  createFlat,
  getFlatById as getFlatByIdService,
  getAllFlats as getAllFlatsService,
  updateFlat as updateFlatService,
  deleteFlat as deleteFlatService,
  getFlatsCities as getFlatsCitiesService,
} from "../services/flat.service.js";

const addFlat = async (req, res) => {
  try {
    const flat = await createFlat(req.body, req.user.id);
    res.status(201).json(flat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getFlatById = async (req, res) => {
  try {
    const flat = await getFlatByIdService(req.params.flatId);
    res.status(200).json(flat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllFlats = async (req, res) => {
  try {
    const flats = await getAllFlatsService(req.query, req.user.id);
    res.status(200).json(flats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateFlat = async (req, res) => {
  try {
    const flat = await updateFlatService(req.params.flatId, req.body);
    res.status(200).json(flat);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Server error" });
  }
};

const deleteFlat = async (req, res) => {
  try {
    const flat = await deleteFlatService(req.params.flatId);
    res.status(200).json(flat);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Server error" });
  }
};

const getFlatsCities = async (req, res) => {
  try {
    const cities = await getFlatsCitiesService();
    res.status(200).json(cities);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export { addFlat, getFlatById, getAllFlats, updateFlat, deleteFlat, getFlatsCities };
