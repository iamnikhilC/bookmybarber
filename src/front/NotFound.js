import { Link, useNavigate } from "react-router-dom";
import NotFoundImg from '../images/404.png'; // ✅ import image
const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="notfound-container">
      <img src={NotFoundImg}/>
      <p>
        Oops! This page got a bad haircut 😅. 
        Let’s get you back in the chair
      </p>
      <button className="home-btn" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
};

export default NotFound;
