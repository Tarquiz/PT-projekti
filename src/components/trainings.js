import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Snackbar from "@mui/material/Snackbar";
import Moment from "react-moment";
import Button from "@mui/material/Button";

function TrainingsList() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const deleteTraining = (url) => {
    if (window.confirm("Are you sure you want to delete training?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchTrainings();
            setMsg("training deleted");
            setOpen(true);
          } else alert("Deletion failed");
        })
        .catch((err) => console.error(err));
    }
  };

  const columns = [
    {
      field: "date",
      cellRendererFramework: (params) => (
        <Moment format="DD.MM.YYYY HH:mm" date={params.data.date} />
      ),
      sortable: true,
      filter: true,
    },
    { field: "duration", sortable: true, filter: true },
    { field: "activity", sortable: true, filter: true },
    { field: "customer.firstname", sortable: true, filter: true },
    { field: "customer.lastname", sortable: true, filter: true },
    {
      headerName: "",
      sortable: false,
      filter: false,
      width: 100,
      cellRendererFramework: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() =>
            deleteTraining(
              `https://customerrest.herokuapp.com/api/trainings/${params.data.id}`
            )
          }
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div
        className="ag-theme-material"
        style={{ marginTop: 20, height: 600, width: "60%", margin: "auto" }}
      >
        <h1
          style={{
            textAlign: "left",
            marginBottom: "12px",
            marginTop: "12px",
            color: "#3174AD",
          }}
        >
          Trainings
        </h1>
        <AgGridReact
          rowData={trainings}
          columnDefs={columns}
          pagination={true}
          paginationpPageSize={9}
          suppressCellSelection={true}
        />
      </div>
      <Snackbar
        open={open}
        message={msg}
        autoHideDuration={3000}
        onClose={handleClose}
      />
    </div>
  );
}

export default TrainingsList;
