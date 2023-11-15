import './App.css';
import { Routes, Route,useNavigate} from 'react-router-dom';
import React from "react"
import Button from "@mui/material/Button";
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Home } from './Home';
import { NotFoundPage } from './NotFoundPage';
import { Lists } from './Lists'
import { Authors } from './Authors';
function App() {
  const Navigate=useNavigate()
 const [lists,setLists]=useState([])
 const [authors,setAuthors]=useState([])
 const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <CssBaseline />
      <Button onClick={()=>{Navigate("/")}}>Home</Button>
      <Button onClick={()=>{Navigate("/Lists")}}>Lists</Button>
      <Button onClick={()=>{Navigate("/Authors")}}>Authors</Button>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Lists" element={<Lists lists={lists} setLists={setLists} />} />
        <Route path="/Authors" element={<Authors authors={authors} setAuthors={setAuthors} />
} />
       
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;


