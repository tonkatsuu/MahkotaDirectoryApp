import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import DashboardPieChart from "../../components/dashboard-pie-chart/DashboardPieChart";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="shops" />
          <Widget type="categories" />
          <Widget type="amenities" />
          <Widget type="events" />
        </div>

        <div className="charts">
          <DashboardPieChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
