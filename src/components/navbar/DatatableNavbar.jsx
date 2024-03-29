import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const DatatableNavbar = ({ onChange }) => {
  const { user } = useContext(AuthContext);
  const { darkMode, dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." onChange={onChange} />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            {!darkMode ? (
              <LightModeOutlinedIcon
                className="icon"
                onClick={() => dispatch({ type: "DARK" })}
              />
            ) : (
              <DarkModeOutlinedIcon
                className="icon"
                onClick={() => dispatch({ type: "LIGHT" })}
              />
            )}
          </div>
          <div className="item">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <img src={user?.photoURL} alt="" className="avatar" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatatableNavbar;
