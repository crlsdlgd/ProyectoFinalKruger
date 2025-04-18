import { createFlat, getFlatById as getFlatByIdService, getAllFlats as getAllFlatsService, updateFlat as updateFlatService, deleteFlat as deleteFlatService } from "../services/flat.service.js";

const addFlat = async (req, res) => {
  try {
    const flat = await createFlat(req.body);
    res.status(201).json(flat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getFlatById = async (req, res) => {
  try {
    const flat = await getFlatByIdService(req.params.id);
    res.status(200).json(flat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllFlats = async (req, res) => {
  try {
    const flats = await getAllFlatsService();
    res.status(200).json(flats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateFlat = async (req, res) => {
  try {
    const flat = await updateFlatService(req.params.id, req.body);
    res.status(200).json(flat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFlat = async (req, res) => {
  try {
    const flat = await deleteFlatService(req.params.id);
    res.status(200).json(flat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { addFlat, getFlatById, getAllFlats, updateFlat, deleteFlat };
