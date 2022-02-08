import React from 'react';
import ReactDOM from 'react-dom';
// import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import './components/Forms.css';
import './components/Navbar.css';
import './components/Card.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
    <GlobalProvider>
        <App />
    </GlobalProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
