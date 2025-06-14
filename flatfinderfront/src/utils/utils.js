import { LocalStorageService } from "../services/localStorageService";
import { UserService } from "../services/userService";

const calculateAge = (birthDate) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getUTCFullYear() - birthDateObj.getUTCFullYear();
  const m = today.getUTCMonth() - birthDateObj.getUTCMonth();
  if (m < 0 || (m === 0 && today.getUTCDate() < birthDateObj.getUTCDate())) {
    age -= 1;
  }
  return age;
};

const calendarToISOString = (date) => {
  console.log("DATE CALENDAR", date);
  return new Date(date).toISOString();
};

const getDateYearsAgo = (yearsAgo) => {
  const today = new Date();
  const yearsAgoDate = new Date(today.getFullYear() - yearsAgo, today.getMonth(), today.getDate());
  return yearsAgoDate.toISOString().slice(0, 10);
};

const toggleFavorite = async (flatId, setUserLogged) => {
  const userService = new UserService();
  try {
    await userService.toggleFavorite(flatId);
    const localStorageService = new LocalStorageService();
    const updateUser = localStorageService.getUser();
    setUserLogged(updateUser);
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
};

export { calculateAge, calendarToISOString, toggleFavorite, getDateYearsAgo };