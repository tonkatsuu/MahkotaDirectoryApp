import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { amenityColumns } from "../../datatablesource";
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
      collection(db, "amenities"),
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
    await deleteEntryFromDb("amenities", id, () => {
      toast.success("Amenity deleted successfully!");
    });
  };

  async function handleMultipleDelete() {
    if (selectedIds.length === 0) {
      toast.error("Select at least one row");
      return;
    }

    Promise.all(
      selectedIds.map((id) => deleteEntryFromDb("amenities", id))
    ).then(() => {
      toast.success("Rows deleted successfully!");
    });
  }

  const columns = amenityColumns.filter((column) => {
    // only show columns if user is admin or `hidden` is false
    return isAdmin(user) || !column?.hidden;
  });

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/amenity/edit/${params.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
            </Link>
            {isAdmin(user) && (
              <>
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
                    duplicateEntry("amenities", omit(params.row, "id"), () => {
                      toast.success("Amenity duplicated successfully!");
                    });
                  }}
                >
                  Duplicate
                </div>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const filteredData = query
    ? matchSorter(data, query, {
        keys: ["amenity_name"],
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
          <div>Amenity List</div>
          <div className="buttons">
            {isAdmin(user) && (
              <Link to="/amenity/new" className="link">
                Add New
              </Link>
            )}
            {selectedIds.length > 0 && isAdmin(user) && (
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
          checkboxSelection
          onStateChange={(state) => {
            setSelectedIds(state.selection);
          }}
          onCellEditStop={(params, e) => {
            updateEntry("amenities", params.id, {
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
