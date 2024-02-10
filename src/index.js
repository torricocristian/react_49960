import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDpSpFLYLocw7d6X5qI9IT_QJ-GlT8iLU8",
  authDomain: "test-coderhouse-f0145.firebaseapp.com",
  projectId: "test-coderhouse-f0145",
  storageBucket: "test-coderhouse-f0145.appspot.com",
  messagingSenderId: "79587765857",
  appId: "1:79587765857:web:c5b40c709e7e0db11dc420"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
