import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import AllUsers from "../pages/all-users/allUsers";
import Profile from "../pages/profile/profile";
import EditUser from "../pages/edit-user/editUser";
import UpdatePassword from "../pages/update-password/updatePassword";
import ForgotPassword from "../pages/forgot-password/forgotPassword";
import ResetPassword from "../pages/reset-password/resetPassword";
import Home from "../pages/home/home";
import Favorites from "../pages/favorites/favorites";
import MyFlats from "../pages/my-flats/myFlats";
import ViewFlat from "../pages/view-flat/viewFlat";
import NewFlat from "../pages/new-flat/newFlat";
import EditFlat from "../pages/edit-flat/editFlat";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/all-users" element={<AllUsers />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/edit-user/:userId" element={<EditUser />} />
      <Route path="/update-password" element={<UpdatePassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/my-flats" element={<MyFlats />} />
      <Route path="/view-flat/:flatId" element={<ViewFlat />} />
      <Route path="/new-flat" element={<NewFlat />} />
      <Route path="/edit-flat/:flatId" element={<EditFlat />} />
    </Routes>
  );
};

export default AppRouter;
