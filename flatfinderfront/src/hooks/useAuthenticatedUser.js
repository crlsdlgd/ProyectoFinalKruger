import { useEffect, useState } from "react"
import { LocalStorageService } from "../services/localStorageService";
import { jwtDecode } from "jwt-decode";
import { addToast } from "@heroui/react";


const useAuthenticatedUser = () => {
  const [userPayload, setUserPayload] = useState(null);
  useEffect(() => {
    const localStorageService = new LocalStorageService();
    const token = localStorageService.getToken();
    if (!token) {
      window.location.href = "/login";
    }
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
        addToast({
          title: "Token expired",
          description: "Your session has expired, please login again",
          type: "warning",
          variant: "bordered",
          color: "warning",
        });
        setTimeout(() => {
          localStorageService.removeToken();
          window.location.href = "/login";
        }, 3000);
      }
      setUserPayload(decoded);
    } catch (error) {
      console.error("Error decoding token:", error);
      addToast({
        title: "Token error",
        description: "There was an error with your session, please login again",
        type: "error",
        variant: "bordered",
        color: "danger",
      });
      setTimeout(() => {
        localStorageService.removeToken();
        window.location.href = "/login";
      }, 3000);
    }
  }, []);
  return userPayload;
}

export default useAuthenticatedUser;