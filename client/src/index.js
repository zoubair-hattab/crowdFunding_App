import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CrowdFundingProvider } from './context/corwdFunding';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CrowdFundingProvider>
    <App />
  </CrowdFundingProvider>
);
