import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { shopColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { deleteEntryFromDb, duplicateEntry } from "../../utils/database";
import { omit } from "lodash";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "shops"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    await deleteEntryFromDb("shops", id, () => {
      toast.success("Shop deleted successfully!");
    });
  };

  const actionColumn = [
    {
      field: "id",
      headerName: "Action",
      width: 230,
      renderCell: (params) => {
        console.log(params.row);

        return (
          <div className="cellAction">
            <Link
              to={`/shops/edit/${params.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <div
              className="duplicateButton"
              onClick={(e) => {
                e.preventDefault();
                duplicateEntry("shops", omit(params.row, "id"), () => {
                  toast.success("Shop duplicated successfully!");
                });
              }}
            >
              Duplicate
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <div>Shop List</div>

        <div className="buttons">
          <Link to="/shops/new" className="link">
            Add New
          </Link>
          <div className="deleteButton">Delete</div>
        </div>
      </div>
      <DataGrid
        getRowId={(row) => row.id}
        className="datagrid"
        rows={data}
        columns={shopColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowHeight={() => 80}
      />
    </div>
  );
};
export default Datatable;
