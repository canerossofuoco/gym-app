
import './index.css';
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Training from "./pages/Training"
import Login from './pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import CaloriesPage from './pages/caloriesPage';
import { loginUser } from './scripts/fetch';
import { useEffect, useState } from 'react';
import Workouts from './pages/Workouts';
import RegisterPage from './pages/RegisterPage';

async function login () {
  var cookie_id = localStorage.getItem("cookie_id");
  var cookie_email = localStorage.getItem("cookie_email");
  var res;
  if(cookie_id!=null && cookie_email != null) {
      res = await loginUser(cookie_id,cookie_email,"","");
      return res["login"];
  }else 
    return false;
}

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => { 
    const checkLogin = async () => {
      const isAuthenticated = await login();
      setAuthenticated(isAuthenticated);
    };
    checkLogin();
  }, []);

  return (
    <Routes>
      {authenticated ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/training" element={<Training />} />
          <Route path="/caloriespage" element={<CaloriesPage />} />
          <Route path="/workouts" element={<Workouts/>} />
          <Route path="*" element={<Home />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </>
      )}
    </Routes>
  );
};

export default App;