import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/profiles/')
      .then((res) => {
        console.log('Connected to backend! Profiles:', res.data);
      })
      .catch((err) => {
        console.error('Error connecting to backend:', err);
      });
  }, []);

  return (
    <div>
      <h1>Testing Backend Connection</h1>
      <p>Open console to see result.</p>
    </div>
  );
}

export default App;