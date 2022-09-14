import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [podData, setPodData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    console.log("Load Data Effect");
    fetch('/api/load_data').then(res => {
      if (!res.ok) throw new Error(res.status);
      else setDataLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (dataLoaded)
    {
      console.log("Load POD");
      fetch('/api/pod').then(res => res.json()).then(data => {
        setPodData(data);
      });
    }
  }, [dataLoaded]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <p>Excel Data Loaded? {String(dataLoaded)}</p>
        <p>POD Data: {JSON.stringify(podData)}</p>
      </header>
    </div>
  );
}

export default App;
