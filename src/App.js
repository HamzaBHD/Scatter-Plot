import React, { useEffect, useState } from 'react';
import './App.css';
import Scatter from './Scatter';

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(response => response.json())
    .then(data => setData(data))
  }, [])

  const width = 800
  const height = 600 
  const padding = 50 


  return (
    <div className="main--container">
      <h1 id='title'>Doping in Professional Bicycle Racing</h1>
      <h3 id='description'>35 Fastest times up Alpe d'Huez</h3>
      <div id='tooltip'>
      
      </div>
        <Scatter
          data={data}
          width={width}
          height={height}
          padding={padding}
          />
      <div id='legend'>
        <span className='para'><div className='div1 orange'></div>No doping allegations</span>
        <span className='para'><div className='div1 blue'></div>Riders with doping allegations</span>
      </div>
    </div>
  );
}

export default App;
