import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { AuthContext } from "../../context/AuthContext";

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
            <img src={user?.photoURL} alt="" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatatableNavbar;
