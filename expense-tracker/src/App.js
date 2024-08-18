import logo from './logo.svg';
import './App.css';
import {ShowData} from './components/ShowData.js';
import {ExpenseTracker} from './components/ExpenseTracker';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShowData></ShowData>}></Route>
          <Route path='/add' element={<ExpenseTracker></ExpenseTracker>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
