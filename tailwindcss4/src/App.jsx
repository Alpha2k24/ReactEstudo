import React, { Suspense } from 'react';
import PlanetVideoPlayer from "./components/UiModerna"
import './App.css';


function App() {

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-black'>
      <Suspense fallback={<div className="text-white">Carregando...</div>}>
        <PlanetVideoPlayer/>
      </Suspense>
    </div>
  );
}

export default App;
