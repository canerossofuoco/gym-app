import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from "./components/theme-provider"
import { useTheme } from "next-themes"
import reportWebVitals from './test/reportWebVitals';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Training from "./pages/Training"
import Home from "./pages/Home"
import Login from "./pages/Login" 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const theme = "light";
localStorage.setItem("theme",theme);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider
        attribute="class"
        defaultTheme={theme}
        enableSystem
        disableTransitionOnChange
      >
      <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
