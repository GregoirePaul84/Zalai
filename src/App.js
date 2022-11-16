import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './pages/About';
import Basket from './pages/Basket';
import Home from './pages/Home';
import Products from './pages/Products';

function App() {

  useEffect(() => {
        
    if (JSON.parse(localStorage.getItem('basket')) === null) {
        localStorage.setItem('basket', JSON.stringify([]));
    }
    else {
        return;
    }
  }, []);

  return (
    <Router>
        <Routes>
          <Route path="/Zalai/" element={<Home/>} />
            <Route path="/Zalai/" element={<Home/>} />
            <Route path="/Zalai/home" element={<Home/>} />
            <Route path="/Zalai/about" element={<About/>} />
            <Route path="/Zalai/products" element={<Products/>}>
              <Route path="/Zalai/products/:id" element={<Products/>}/>
            </Route>
            <Route path="/Zalai/basket" element={<Basket/>} />
        </Routes>
      </Router>
  );
}

export default App;
