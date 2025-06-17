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
  return new Date(date).toISOString();
};

const formatDateToISOShort = (isoString) => {
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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

function formatTimeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - new Date(date)) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days < 7) {
    return `${days}d ago`;
  } else if (weeks < 4) {
    return `${weeks}w ago`;
  } else if (months < 12) {
    return `${months} month ago`;
  } else {
    return `${years} years ago`;
  }
}

export { calculateAge, calendarToISOString, toggleFavorite, getDateYearsAgo, formatDateToISOShort, formatTimeAgo };