import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Logout() {
const navigate = useNavigate();

  useEffect(() => {
    axios.post("http://localhost/MyBarber/backend/api/auth/logout.php").then(() => {
      localStorage.clear();
      navigate("/login")
    });
  }, []);

  return <p>Logging out...</p>;
}
