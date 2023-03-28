import './App.css';
import React, { useState } from "react";
import { Container, Grid, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import CSVReader from "react-csv-reader";
import axios from "axios";


function App() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  console.log(file)
  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  const processData = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      setResults(response.data);
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  return (
    <div className='wrapper'>
      <div className='header-div'>
        <Typography variant="h4" gutterBottom>
          Employee Project Collaboration
        </Typography>
      </div>
      <Container maxWidth="md">
        <Grid container spacing={2} direction="column" >
          <Grid item xs={12}>
            <input
              type="file"
              id="csvFileInput"
              onChange={(event) => handleFileUpload(event.target.files[0])}
              style={{ display: "none" }}
              accept=".csv"
            />
            <Button
              variant="contained"
              component="label"
            >
              Choose CSV file
              <input
                type="file"
                id="csvFileInput"
                onChange={(event) => handleFileUpload(event.target.files[0])}
                style={{ display: "none" }}
                accept=".csv"
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            {file && (
              <Typography variant="body1" component="span" style={{ marginLeft: 16 }}>
                {file.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {file && (
              <Button variant="outlined" color="error" onClick={handleFileRemove}>
                Remove file
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            {file && (
              <Button variant="contained" color="primary" onClick={processData}>
                Process data
              </Button> 
            )}
          </Grid >
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee 1</TableCell>
                    <TableCell>Employee 2</TableCell>
                    <TableCell>Project ID</TableCell>
                    <TableCell>Days worked</TableCell>
                  </TableRow>
                </TableHead>
                {results.length > 0 && (
                  <TableBody>
                    {results.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.employee1}</TableCell>
                        <TableCell>{row.employee2}</TableCell>
                        <TableCell>{row.projectId}</TableCell>
                        <TableCell>{row.daysWorked}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  )}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
