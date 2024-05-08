import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from "./components/theme-provider"
import reportWebVitals from './test/reportWebVitals';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useLocalStorage } from "@uidotdev/usehooks";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

var theme:any = "dark";
if(localStorage.getItem("theme"))
  theme = localStorage.getItem("theme");


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
