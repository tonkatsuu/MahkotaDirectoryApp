import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="shops" />
          <Widget type="product" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
      </div>
    </div>
  );
};

export default Home;
