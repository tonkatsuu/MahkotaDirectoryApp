import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { auth } from "../../firebase";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });

      navigate("/login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <li onClick={handleLogout}>
      <ExitToAppIcon className="icon" />
      <span>Logout</span>
    </li>
  );
};

export default LogoutButton;
