import React, { dangerouslySetInnerHTML, useMemo, useEffect, useState } from 'react'
import './App.css';
import { Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function App() {

  const [rowData, setRowData] = useState()
  const [popularData, setPopularData] = useState(1)
  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true
  }), []);

  const columnDefs = [
    { field: 'source' },
    { field: 'adx_keywords' },
    { field: 'title' },
    { field: 'abstract' },
    { field: 'published_date' },
    {
      field: 'url', cellRendererFramework: (params) => {
        return <a href={params.data.url} target='_blank' >Read..</a>
      }
    }
  ]

  // gets called once, no dependencies, loads the grid data
  useEffect(() => {
    fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/${popularData}.json?api-key=FMmgiACOnSD3prT3oP8bnjD95yD5ESsi`)
      .then(resp => resp.json())
      .then(data => setRowData(data.results));
  }, [popularData]);


  return (
    <>
      <div >
        <span className='header'>NY Times Most popular Views</span>
      </div>
      <Dropdown className='dropdown'>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            View Popular List
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#1" onClick={() => setPopularData(1)}>1</Dropdown.Item>
            <Dropdown.Item href="#7" onClick={() => setPopularData(7)}>7</Dropdown.Item>
            <Dropdown.Item href="#30" onClick={() => setPopularData(30)}>30</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      <div className="ag-theme-alpine" style={{ height: '600', width: '100%', padding: '30px' }}>
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
        </AgGridReact>
      </div>
    </>
  );
}

export default App;
