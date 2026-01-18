import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Logout() {
const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
      navigate("/login");
    // axios.post("http://localhost/MyBarber/backend/api/auth/logout.php").then(() => {
    // });
  }, []);

  return <p>Logging out...</p>;
}
