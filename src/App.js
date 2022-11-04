import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './pages/About';
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
        </Routes>
      </Router>
  );
}

export default App;
