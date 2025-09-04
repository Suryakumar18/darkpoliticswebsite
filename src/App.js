import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import AdminPanel from './pages/Adminpanel';
function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/adminpanel' element={<AdminPanel />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
