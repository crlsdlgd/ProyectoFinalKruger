import { useState, useEffect } from "react";
import { LocalStorageService } from "../services/localStorageService";
import { jwtDecode } from "jwt-decode";

const useUserRole = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    const localStorageService = new LocalStorageService();
    const token = localStorageService.getToken();
    if (!token) {
      return "";
    }
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      return "";
    }
    setRole(decoded.role);
  }, [])
  return role;
}

export default useUserRole;