/* eslint-disable react/prop-types */
import { withStyles } from '@material-ui/core';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React from 'react';
// import './style.css';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

const StyledDataGrid = withStyles({
  root: {
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important'
    },
    '& .MuiDataGrid-cell': {
      lineHeight: 'unset !important',
      maxHeight: 'none !important',
      whiteSpace: 'normal'
    },
    '& .MuiDataGrid-row': {
      maxHeight: 'none !important',
      fontFamily: 'var(--font-family-monospace)'
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: '700',
      color: '#404a69 !important',
      fontFamily: 'var(--font-family-monospace)'
    }
  }
})(DataGrid);

export function DataTable(props) {
  const {
    rows = [],
    columns = [],
    rowsPerPageOptions = [],
    loading = false,
    pageSize = 5,
    onPageSizeChange,
    enableReport = false,
    reportName = '',
    subTitle = '',
    fileName = ''
  } = props;
  const [isExportDropdownOpen, setIsExportDropdownOpen] = React.useState(false);

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const handleExport = () => {
    setIsExportDropdownOpen(!isExportDropdownOpen);

    // Define the margin for each cell to create space between columns
    const cellMargin = [0, 5]; // [leftMargin, rightMargin]

    // Get the current date and time
    const currentDateTime = new Date().toLocaleString();

    // Define a regular expression for case-insensitive matching
    const excludeHeaderRegex = /(description|created|action|link|emergency|emerge|DOB|site|ID)/i;

    // Define the PDF document definition with landscape orientation
    const docDefinition = {
      // Set the entire PDF to landscape mode
      pageOrientation: 'landscape',

      content: [
        // Centered reportName
        { text: reportName, fontSize: 30, bold: true, alignment: 'center' },
        // Centered subTitle
        { text: subTitle, fontSize: 20, bold: true, alignment: 'center' },
        // Add current date and time after subTitle
        { text: currentDateTime, fontSize: 14, alignment: 'center' },
        // Add space between date/time and the line separator
        { margin: [0, 10], text: ' ' },
        // Add a line separator
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 820, // Adjust the width to span the entire landscape page
              y2: 0,
              lineWidth: 0.5
            }
          ]
        },
        // Add space between the line and the table data
        { margin: [0, 10], text: ' ' },
        {
          // Center-align the entire table horizontally
          table: {
            headerRows: 1,
            width: '100%', // Make the table width fit the entire page size
            body: [
              // Make column.headerName font weight bold
              columns.map((column) => {
                if (excludeHeaderRegex.test(column.headerName)) {
                  return { text: '', bold: true }; // Exclude header
                } else {
                  return { text: column.headerName, bold: true };
                }
              }),
              ...rows.map((row) =>
                columns.map((column) => {
                  // Check if the header name matches the exclusion pattern
                  if (excludeHeaderRegex.test(column.headerName)) {
                    return { text: '', margin: cellMargin }; // Exclude cell
                  } else {
                    return {
                      text: row[column.field] || '',
                      margin: cellMargin // Apply margin to create space between columns
                    };
                  }
                })
              )
            ],
            // Center-align the entire table horizontally
            alignment: 'center'
          },
          // Remove table borders
          layout: 'noBorders'
        }
      ]
    };

    // Generate the PDF
    const pdfDoc = pdfMake.createPdf(docDefinition);

    // Download the PDF
    pdfDoc.download(`${fileName}.pdf`);
  };

  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 4,
          pb: 0,
          mb: 5,
          display: 'flex',
          justifyContent: 'space-between'
        }}
        // id={identifier ? identifier : 'search_table_v2'}
      >
        <GridToolbarQuickFilter
          quickFilterParser={(searchInput) =>
            searchInput
              .split(',')
              .map((value) => value.trim())
              .filter((value) => value !== '')
          }
        />

        <div style={enableReport ? { display: 'block' } : { display: 'none' }}>
          {isExportDropdownOpen ? (
            // Render the export options when the dropdown is open
            <Button
              variant="outlined"
              onClick={handleExport}
              sx={{
                width: '200px'
              }}
            >
              Download Report
            </Button>
          ) : (
            // Render a button to open the dropdown when it's closed
            <Button
              variant="outlined"
              onClick={handleExport}
              sx={{
                width: '200px'
              }}
            >
              Download Report
            </Button>
          )}
        </div>
      </Box>
    );
  }
  return (
    <div style={{ width: '100%' }}>
      <StyledDataGrid
        sx={{
          boxShadow: 0,
          border: 0,
          color: 'rgb(26 26 26 / 87%)',
          borderColor: '#ddd',
          '& .MuiDataGrid-cell': {
            whiteSpace: 'normal',
            padding: '7px 0px'
          }
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        rows={rows}
        loading={loading}
        autoHeight
        id={Math.random()}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        pagination
        rowsPerPageOptions={rowsPerPageOptions}
        getRowId={() => Math.random()}
        density="standard"
        getRowHeight={() => 'auto'}
        components={{ Toolbar: QuickSearchToolbar }}
        initialState={{
          filter: {
            filterModel: {
              items: []
            }
          }
        }}
      />
    </div>
  );
}
export default DataTable;
