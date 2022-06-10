
import './App.css';
import Navbar from './Navbar';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./bodyPages/Home";
import Favorite from "./bodyPages/Favorite";
import Rated from "./bodyPages/Rated";
import Login from "./bodyPages/Login"
import MovieDetail from "./MovieDetail";



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header>
    
      <Navbar/>


      </header>
    </div>
    <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/favorite" element={<Favorite />} />
          <Route exact path="/rated" element={<Rated />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/movie/:id" element={<MovieDetail />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
