import {
  saveFlat,
  updateFlat as updateFlatRepository,
  deleteFlat as deleteFlatRepository,
  getAllFlats as getAllFlatsRepository,
  getFlatById as getFlatByIdRepository,
  getFlatsCities as getFlatsCitiesRepository,
} from "../repository/flat.repository.js";
import { getFavoriteFlatsIdsByUserId } from "../repository/user.repository.js";

const createFlat = async (flat, userId) => await saveFlat(flat, userId);
const updateFlat = async (flatId, flat) => await updateFlatRepository(flatId, flat);
const deleteFlat = async (flatId) => await deleteFlatRepository(flatId);
const getFlatsCities = async () => await getFlatsCitiesRepository();

const getAllFlats = async (query, userId) => {
  let queryObject = { ...query };
  const withoutFields = ["sort", "page", "limit", "fields", "pathname"];
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
  let sort = "rentPrice";
  if (query.sort) {
    sort = query.sort.split(",").join(" ");
  }

  //Paginacion
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  //Home, mis flats, favoritos
  switch (query.pathname) {
    case "my-flats":
      queryObject = { ...queryObject, ownerId: userId };
      break;
    case "favorites":
      const favoriteFlatIds = await getFavoriteFlatsIdsByUserId(userId);
      queryObject = {
        ...queryObject,
        _id: { $in: favoriteFlatIds },
      };
      break;
    default:
      break;
  }

  //Consulta a la base de datos
  return await getAllFlatsRepository(
    queryObject,
    selected,
    sort,
    skip,
    limit
  );
};
const getFlatById = async (flatId) => await getFlatByIdRepository(flatId);

export { createFlat, updateFlat, deleteFlat, getAllFlats, getFlatById, getFlatsCities };
