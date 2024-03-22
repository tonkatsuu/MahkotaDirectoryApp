import "./datatable.scss";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import { eventColumns } from "../../datatablesource";
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

const Datatable = () => {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "events"),
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
    await deleteEntryFromDb("events", id, () => {
      toast.success("Event deleted successfully!");
    });
  };

  async function handleMultipleDelete() {
    if (selectedIds.length === 0) {
      toast.error("Select at least one row");
      return;
    }

    Promise.all(selectedIds.map((id) => deleteEntryFromDb("events", id))).then(
      () => {
        toast.success("Rows deleted successfully!");
      }
    );
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/event/edit/${params.id}`}
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
                duplicateEntry("events", omit(params.row, "id"), () => {
                  toast.success("Event duplicated successfully!");
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

  const filteredData = matchSorter(data, query, {
    keys: ["name"],
  });

  return (
    <>
      <DatatableNavbar
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <div className="datatable">
        <div className="datatableTitle">
          <div>Event List</div>
          <div className="buttons">
            <Link to="/event/new" className="link">
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
          columns={eventColumns.concat(actionColumn)}
          pageSize={100}
          rowsPerPageOptions={[100]}
          getRowHeight={() => 80}
          checkboxSelection
          onStateChange={(state) => {
            setSelectedIds(state.selection);
          }}
          onCellEditStop={(params, e) => {
            updateEntry("events", params.id, {
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
