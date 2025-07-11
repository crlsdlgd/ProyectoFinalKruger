import {
  createUser,
  loginUser as loginUserService,
  getUserById as getUserByIdService,
  getAllUsers as getAllUsersService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
  toggleFavorite as toggleFavoriteService,
  updatePassword as updatePasswordService
}
  from "../services/user.service.js";

const saveUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const userLogged = await loginUserService(req.body.email, req.body.password);
    if (!userLogged) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json(userLogged);
  } catch (error) {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService(req.query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const updatedUser = await updateUserService(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUserService(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: `${error.message} asdasdads` });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const user = await toggleFavoriteService(req.user.id, req.params.flatId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const user = await updatePasswordService(
      req.user.id,
      req.body.currentPassword,
      req.body.newPassword
    );
    res.json(user);
  } catch (error) {
    if (error.message === "User not found" || error.message === "Current password is incorrect") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};



export { saveUser, loginUser, getUserById, getAllUsers, updateUser, deleteUser, toggleFavorite, updatePassword };