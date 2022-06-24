import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/pages/Login';
import { Home } from './components/pages/Home';
import { PrivateRouter } from './routes/PrivateRouter';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={
        <PrivateRouter>
          <Home/>
        </PrivateRouter>}
      />
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </div>
  );
}

export default App;
