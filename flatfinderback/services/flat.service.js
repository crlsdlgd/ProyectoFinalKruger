import {
  saveFlat,
  updateFlat as updateFlatRepository,
  deleteFlat as deleteFlatRepository,
  getAllFlats as getAllFlatsRepository,
  getFlatById as getFlatByIdRepository,
} from "../repository/flat.repository.js";

const createFlat = async (flat) => await saveFlat(flat);
const updateFlat = async (id, flat) => await updateFlatRepository(id, flat);
const deleteFlat = async (id) => await deleteFlatRepository(id);
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
const getFlatById = async (id) => await getFlatByIdRepository(id);

export { createFlat, updateFlat, deleteFlat, getAllFlats, getFlatById };
