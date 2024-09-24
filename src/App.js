import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './Pages/Home';
import Adduser from './Pages/Adduser';
import Viewuser from './Pages/Viewuser';
function App() {
  return (
    <BrowserRouter>
     <Routes>
<Route path='/' element={<Home />} />
<Route path='/adduser' element={<Adduser />} />
<Route path='/viewuser/:id' element={<Viewuser />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
