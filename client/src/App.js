import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './routes/index.js';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    // listen for account changes
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
      // Listen for chain change
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
