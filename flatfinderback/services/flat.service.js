import {
  saveFlat,
  updateFlat as updateFlatRepository,
  deleteFlat as deleteFlatRepository,
  getAllFlats as getAllFlatsRepository,
  getFlatById as getFlatByIdRepository,
} from "../repository/flat.repository.js";

const createFlat = async (flat, userId) => await saveFlat(flat, userId);
const updateFlat = async (flatId, flat, userId) => {
  await verifyOwnership(flatId, userId);
  return await updateFlatRepository(flatId, flat);
};
const deleteFlat = async (flatId, userId) => {
  await verifyOwnership(flatId, userId);
  return await deleteFlatRepository(flatId);
};
const getAllFlats = async (query) => {
  try {
    let queryObject = { ...query };
    const withoutFields = ["sort", "page", "limit", "fields"];
    withoutFields.forEach((field) => delete queryObject[field]);

    //Operadores Mongo
    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    queryObject = JSON.parse(queryString);

    //campos a seleccionar
    let selected = "";
    if (query.fields) {
      selected = query.fields.split(",").join(" ");
    }

    //Ordenamiento
    let sort = "yearBuilt";
    if (query.sort) {
      sort = query.sort.split(",").join(" ");
    }

    //Paginacion
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    return await getAllFlatsRepository(
      queryObject,
      selected,
      sort,
      skip,
      limit
    );
  } catch (error) {
    return { error: error.message };
  }
};
const getFlatById = async (flatId) => await getFlatByIdRepository(flatId);

const verifyOwnership = async (flatId, userId) => {
  const flat = await getFlatByIdRepository(flatId);

  if (!flat) {
    const error = new Error("Flat not found");
    error.status = 404;
    throw error;
  }

  if (flat.ownerId != userId) {
    const error = new Error("You are not authorized to perform this action");
    error.status = 403;
    throw error;
  }

  return flat;
};


export { createFlat, updateFlat, deleteFlat, getAllFlats, getFlatById };
