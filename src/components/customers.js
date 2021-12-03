import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import AddCustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";
import Addtraining from "./Addtraining";

function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchCustomers();
            setMsg("customer deleted");
            setOpen(true);
          } else alert("Deletion failed");
        })
        .catch((err) => console.error(err));
    }
  };

  const addCustomer = (content) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(content),
    })
      .then((_) => fetchCustomers())
      .catch((err) => console.error(err));
  };

  const addTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((_) => {
        if (_.ok) {
          setMsg("Training added");
          setOpen(true);
          fetchCustomers();
        } else alert("Adding failed");
      })
      .catch((err) => console.error(err));
  };

  const editCustomer = (url, updateCustomer) => {
    fetch(url, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updateCustomer),
    })
      .then((_) => {
        setMsg("Customer updated");
        setOpen(true);
        fetchCustomers();
      })
      .catch((err) => console.error(err));
  };

  const columns = [
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      field: "",
      sortable: false,
      filter: false,
      width: 80,
      cellRendererFramework: (params) => (
        <Editcustomer editCustomer={editCustomer} customer={params} />
      ),
    },
    {
      field: "",
      sortable: false,
      filter: false,
      width: 100,
      cellRendererFramework: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteCustomer(params.data.links[0].href)}
        >
          Delete
        </Button>
      ),
    },
    {
      field: "",
      sortable: false,
      filter: false,
      width: 150,

      cellRendererFramework: (params) => (
        <Addtraining
          addTraining={addTraining}
          customer={params.data.links[0].href}
        />
      ),
    },
  ];

  return (
    <div>
      <AddCustomer addCustomer={addCustomer} />
      <div
        className="ag-theme-material"
        style={{ marginTop: 20, height: 600, width: "80%", margin: "auto" }}
      >
        <h1
          style={{
            textAlign: "left",
            marginBottom: "12px",
            marginTop: "12px",
            color: "#3174AD",
          }}
        >
          Customers
        </h1>
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationpAutoPageSize={true}
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

export default Customerlist;
