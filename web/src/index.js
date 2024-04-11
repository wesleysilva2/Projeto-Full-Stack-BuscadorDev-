import React from 'react';
import ReactDOM from 'react-dom/client';  // DA a habilidade pro react de se comunicar com a arvore de elementos da aplicação, como HTML(HEAD, BOFY, ETC.)
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

