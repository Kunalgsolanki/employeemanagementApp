import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DeshBord from './Component/DeshBord';
import Chart1 from './Component/Charts/Chart1/Chart1';
import Chart2 from './Component/Charts/Chart2';
import Login from './Auth/Login/Login';
import Employee from './Auth/Login/Employee';
import Register from './Auth/Login/Register';
import NotFound from './404';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/Login' replace />} />
        <Route path='/Admin' element={<DeshBord />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Employee' element={<Employee />} />
        <Route path='/Charts1' element={<Chart1 />} />
        <Route path='/Charts2' element={<Chart2 />} />
        <Route path='/404' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
