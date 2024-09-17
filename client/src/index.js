import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import './pages/Auth/AuthStyle.css'
import SearchProvider from './components/Context/SearchContext';
import CartProvider from './components/Context/Cart';
import AuthProvider from './components/Context/authContex';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartProvider>
    <AuthProvider>
        <SearchProvider>
            <Router>
                <App />
            </Router>
        </SearchProvider>
        </AuthProvider>
    </CartProvider>
);


