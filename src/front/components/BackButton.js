import { useNavigate } from "react-router-dom";
import { Icons } from "./Icons";
const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-arrow icon" onClick={() => navigate(-1)}>
      <Icons.BackArrow />
    </button>
  );
};

export default BackButton;
