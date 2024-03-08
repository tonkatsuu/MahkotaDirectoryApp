import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableNavbar from "../../components/navbar/DatatableNavbar";
import Datatable from "../../components/datatable/ShopDatatable";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <DatatableNavbar />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
