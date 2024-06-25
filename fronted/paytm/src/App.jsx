import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './componets/Signin';
import Signup from './componets/Signup';
import DashBoard from './componets/DashBoard';
import Transaction from './componets/Transaction';
import Headers from './componets/Headers';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/transaction' element={<Transaction />} />
        <Route path="*" element={< Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
