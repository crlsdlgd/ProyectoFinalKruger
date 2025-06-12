import jwt from "jsonwebtoken";
import { saveUser, loginUser as loginUserRepository, getUserById as getUserByIdRepository, getAllUsers as getAllUsersRepository, updateUser as updateUserRepository, deleteUser as deleteUserRepository } from "../repository/user.repository.js";
import configs from "../configs/configs.js";

const createUser = async (user) => await saveUser(user);

const loginUser = async (email, password) => {
    const user = await loginUserRepository(email, password);
    if (!user) {
        return null;
    }
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role, name: user.firstname }, configs.JWT_SECRET, { expiresIn: "1h" });
    user.password = undefined; // Remove password from user object
    user.__v = undefined; // Remove __v from user object
    user.updatedAt = undefined; // Remove updatedAt from user object
    user.createdAt = undefined; // Remove createdAt from user object
    user.deletedAt = undefined; // Remove deletedAt from user object

    return { token, user };
};

const getUserById = async (userId) => getUserByIdRepository(userId);
const updateUser = async (userId, user) => updateUserRepository(userId, user);
const deleteUser = async (userId) => deleteUserRepository(userId);

const getAllUsers = async (query) => {
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
    let sort = "firstname";
    if (query.sort) {
        sort = query.sort.split(",").join(" ");
    }

    //Paginacion
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    //Consulta a la base de datos
    const users = await getAllUsersRepository(
        queryObject,
        selected,
        sort,
        skip,
        limit
    );

    //Quitamos la contraseña de los usuarios
    //Se lo hace de esta forma por que no podemos usar .select("-password")
    users.items.forEach((user) => {
        user.password = undefined;
    });
    return users;
};

const toggleFavorite = async (userId, flatId) => {
    const user = await getUserByIdRepository(userId);
    if (!user) return null;
    const isFavorite = user.favoriteFlatIds.map(id => id.toString()).includes(flatId.toString());
    if (isFavorite) {
        user.favoriteFlatIds = user.favoriteFlatIds.filter((id) => id.toString() !== flatId.toString());
    } else {
        user.favoriteFlatIds.push(flatId);
    }
    await updateUserRepository(userId, user);
    return user;
};

export { createUser, loginUser, getUserById, getAllUsers, updateUser, deleteUser, toggleFavorite };