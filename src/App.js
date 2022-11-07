import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './pages/About';
import Basket from './pages/Basket';
import Home from './pages/Home';
import Products from './pages/Products';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/products" element={<Products/>}>
              <Route path="/products/:id" element={<Products/>}/>
            </Route>
            <Route path="/basket" element={<Basket/>} />
        </Routes>
      </Router>
  );
}

export default App;
