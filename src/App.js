import React,{dangerouslySetInnerHTML, useMemo, useEffect, useState }  from 'react'
import './App.css';
import { Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function App() {


  // never changes, so we can use useMemo
  
  const [rowData, setRowData] = useState();

  // never changes, so we can use useMemo
//   const rowData = [
//     {make: "Toyota", model: "Celica", price: 35000},
//     {make: "Ford", model: "Mondeo", price: 32000},
//     {make: "Porsche", model: "Boxter", price: 72000}
// ];

const defaultColDef = useMemo( ()=> ({
  resizable: true,
  sortable: true
}), []);

const columnDefs = [
  // {field: '',cellRendererFramework: (params) => {
  //   return <img src={new URL(params.data.uri)} alt="Avatar" class="avatar"/> 
  // }},
  { field: 'source' },
        { field: 'adx_keywords' },
        { field: 'title' },
        { field: 'abstract' },
        { field: 'published_date' },
        { field: 'url', cellRendererFramework: (params) => {
          return <a href={params.data.url} target='_blank' >Read..</a> 
        } }
]

  // gets called once, no dependencies, loads the grid data
  useEffect( ()=> {
    fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=FMmgiACOnSD3prT3oP8bnjD95yD5ESsi')
        .then( resp => resp.json())
        .then( data => setRowData(data.results));
}, []);

  
  return (
    <>
    <div >
      <span className='header'>NY Times</span>
    {/*  */}
  
  </div>
  {/* <Dropdown className='dropdown'>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
      Dropdown Button
    </Dropdown.Toggle>
  
    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown> */}
  <div className="ag-theme-alpine" style={{height: '600', width: '100%', padding: '10px'}}>
  <AgGridReact
      rowData={rowData}
      reactUi="true"
      domLayout='autoHeight'
      className="ag-theme-alpine"
            animateRows="true"
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableRangeSelection="true"
            rowSelection="multiple"
            suppressRowClickSelection="true" 
            pagination="true"
            paginationPageSize={10}>
      {/* <AgGridColumn field="make"></AgGridColumn>
      <AgGridColumn field="model"></AgGridColumn>
      <AgGridColumn field="price"></AgGridColumn> */}
  </AgGridReact>
</div>
</>
  );
}

export default App;
