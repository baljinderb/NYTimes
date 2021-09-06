import React, { useMemo, useEffect, useState } from 'react'
import './App.css';
import { connect } from 'react-redux'
import { Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { getNews } from './action';

function App({ getNews, article }) {

  console.log(article)
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
  useEffect(async () => {
    getNews(popularData)
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
          rowData={article}
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

const mapStateToProps = (state) => ({
  article: state.news,
})

const mapDispatchToPropss = {
  getNews: getNews
}
export default connect(mapStateToProps, mapDispatchToPropss)(App);
