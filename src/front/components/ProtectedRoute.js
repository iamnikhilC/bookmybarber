import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios
      .get(`http://mybarber.local/auth/protected.php`)
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p>Loading...</p>;
  if (auth === false) return <Navigate to="/login" />;

  return children;
}
