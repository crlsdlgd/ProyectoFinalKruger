import { saveFlat, updateFlat as updateFlatRepository, deleteFlat as deleteFlatRepository, getAllFlats as getAllFlatsRepository, getFlatById as getFlatByIdRepository } from "../repository/flat.repository.js";

const createFlat = async (flat) => await saveFlat(flat);
const updateFlat = async (id, flat) => await updateFlatRepository(id, flat);
const deleteFlat = async (id) => await deleteFlatRepository(id);
const getAllFlats = async () => await getAllFlatsRepository();
const getFlatById = async (id) => await getFlatByIdRepository(id);

export { createFlat, updateFlat, deleteFlat, getAllFlats, getFlatById };
