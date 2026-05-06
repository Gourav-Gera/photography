import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ServiceDetail from "@/pages/ServiceDetail";
import { Toaster } from "sonner";

function App() {
    return (
        <div className="App">
            <BrowserRouter >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/service/:id" element={<ServiceDetail />} />
            </Routes>
      </BrowserRouter>

        <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;