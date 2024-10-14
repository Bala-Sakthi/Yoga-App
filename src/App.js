import React from "react";
import Router from "./routes";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTop from './components/ScrollToTop';







function App() {
  return (
    <div style={{ backgroundColor: "#E3E8E4" }}>
    
    <ScrollToTop />
      <Router />

    
    </div>
  );
}

export default App;
