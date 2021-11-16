import React, { useState, useEffect } from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';


function Customerlist () {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then (response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = url => {
        if(window.confirm('are you sure?')) {
            fetch(url, { method: 'DELETE'})
            .then(response => {
                if (response.ok){
                    fetchCustomers()
                    setOpen(true)
                }
                else
                alert('delete not succesfull')
            })
            .catch(err => console.error(err))
        }}

    const columns = [
        {field: "firstname", sortable: true, filter:true},
        {field: "lastname", sortable: true, filter:true},
        {field: "streetaddress", sortable: true, filter:true},
        {field: "postcode", sortable: true, filter:true},
        {field: "city", sortable: true, filter:true},
        {field: "email", sortable: true, filter:true},
        {field: "phone", sortable: true, filter:true},
        {
            headerName: "",
            sortable: false,
            filter: false,
            width:120,
            field: '_links.self.href',
            cellRendererFramework: params => <Button size="small" color="error" onClick={()=> deleteCustomer(params.value)}>Delete</Button>
        }
    ]

    return(
        <div>
        <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: "80%", margin: "auto"}}>
            <AgGridReact
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationpPageSize={9}
            suppressCellSelection={true}
            />
        </div>
        <Snackbar
        open={open}
        message="Customer deleted"
        autoHideDuration={3000}
        onClose={handleClose}
        />
        </div>
    );
}

export default Customerlist;