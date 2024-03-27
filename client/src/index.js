import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainPage from './components/MainPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ArticlesContainer } from './components/ArticlesContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Navbar />
        <MainPage />
        <Footer />
        <ArticlesContainer />
    </>
);