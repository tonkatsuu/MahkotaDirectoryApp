import "./datatable.scss";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import { shopColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import {
  deleteEntryFromDb,
  duplicateEntry,
  updateEntry,
} from "../../utils/database";
import { omit, orderBy } from "lodash";
import DatatableNavbar from "../navbar/DatatableNavbar";
import { matchSorter } from "match-sorter";
import { isAdmin } from "../../utils/admin";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Datatable = () => {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "shops"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        list = orderBy(list, (item) => item.id);

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

  async function handleMultipleDelete() {
    if (selectedIds.length === 0) {
      toast.error("Select at least one row");
      return;
    }

    Promise.all(selectedIds.map((id) => deleteEntryFromDb("shops", id))).then(
      () => {
        toast.success("Rows deleted successfully!");
      }
    );
  }

  const columns = shopColumns.filter((column) => {
    // only show columns if user is admin or `hidden` is false
    return isAdmin(user) || !column?.hidden;
  });

  const actionColumn = [
    {
      field: "id",
      headerName: "Action",
      width: 230,
      renderCell: (params) => {
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
                e.stopPropagation();
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

  const filteredData = query
    ? matchSorter(data, query, {
        keys: ["tenant_name", "unit_no"],
      })
    : data;

  return (
    <>
      <DatatableNavbar
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <div className="datatable">
        <div className="datatableTitle">
          <div>Shop List</div>
          <div className="buttons">
            <Link to="/shops/new" className="link">
              Add New
            </Link>
            {selectedIds.length > 0 && (
              <div className="deleteButton" onClick={handleMultipleDelete}>
                Delete
              </div>
            )}
          </div>
        </div>
        <DataGrid
          getRowId={(row) => row.id}
          className="datagrid"
          rows={filteredData}
          columns={columns.concat(actionColumn)}
          pageSize={100}
          rowsPerPageOptions={[100]}
          getRowHeight={() => 80}
          checkboxSelection
          onStateChange={(state) => {
            setSelectedIds(state.selection);
          }}
          onCellEditStop={(params, e) => {
            updateEntry("shops", params.id, {
              ...params.row,
              [params.field]: e.target.value,
            });
          }}
        />
      </div>
    </>
  );
};
export default Datatable;
