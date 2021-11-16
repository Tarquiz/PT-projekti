import React, { useState, useEffect } from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function TrainingsList() {

    const [trainings, setTrainings] = useState([]);

    useEffect(()=> {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then (response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        {field: "date"},
        {field: "duration"},
        {field: "activity"},
    ]

    return(
        <div>
             <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: "80%", margin: "auto"}}>
            <AgGridReact
            rowData={trainings}
            columnDefs={columns}
            pagination={true}
            paginationpPageSize={9}
            suppressCellSelection={true}
            />
            </div>
        </div>
    );
}

export default TrainingsList;