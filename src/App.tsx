import './index.css';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Training from "./pages/Training";
import Login from './pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import CaloriesPage from './pages/caloriesPage';
import { loginUser } from './scripts/fetch';
import { useEffect, useState } from 'react';
import Workouts from './pages/Workouts';
import RegisterPage from './pages/RegisterPage';
import { useLocalStorage } from '@uidotdev/usehooks';


async function login(cookie_id:any, cookie_email:any) {
  var res;
  if(cookie_id != null && cookie_email != null) {
      res = await loginUser(cookie_id, cookie_email, "", "");
      return res["login"];
  } else {
    return false;
  }
}

const App = () => {
  const [cookie_id,setCookieId] = useLocalStorage("cookie_id", null);
  const [cookie_email,setCookieEmail] = useLocalStorage("cookie_email", null);
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => { 
    console.log("cacca "+cookie_id, cookie_email);
    const checkLogin = async () => {
      const isAuthenticated = await login(cookie_id, cookie_email);
      setAuthenticated(isAuthenticated);
    };
    checkLogin();
  }, [cookie_id, cookie_email , setCookieEmail,setCookieId]);

  return (
    <Routes>
      {authenticated ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/training" element={<Training />} />
          <Route path="/caloriespage" element={<CaloriesPage />} />
          <Route path="/workouts" element={<Workouts />} />
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
