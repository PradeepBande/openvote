import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin/login" element={<Login />} />
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
