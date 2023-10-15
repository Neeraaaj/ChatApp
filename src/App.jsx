import './App.css'
import Room from './pages/Room'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'
import RegisterPage from './pages/RegisterPage'

function App() {

  const express = require('express');
  const app = express();

  // Configure CORS to allow requests from specific origins
  const allowedOrigins = ['https://chat-app-neeraaaj.vercel.app'];

  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // Add other CORS headers as needed
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  // Your other route handling code goes here

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegisterPage />}  />        
          <Route element={<PrivateRoutes />} >
            <Route path='/' element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
