import { useEffect } from 'react';
import './App.scss';
import Home from './pages/home/Home';

function App() {
  useEffect(() => {
    document.title = 'GibsonJ.net';
  }, []);

  return (
    <div style={{
      maxWidth: '60rem',
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch'
    }}>
      <Home></Home>
    </div>
  );
}

export default App;
