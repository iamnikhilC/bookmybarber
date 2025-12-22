import { useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-arrow" onClick={() => navigate(-1)}>
      <HiChevronLeft />
    </button>
  );
};

export default BackButton;
