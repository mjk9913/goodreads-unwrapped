// import './App.css';
// import Author from './components/author/Author';
// import Popularity from './components/popularity/Popularity'
// import Home from './components/home/Home'

// function App() {
//   return (
//     <div className="App">
//       <div className="scroll1"><Home /></div>
//       <div className="scroll2"><Author /></div>
//       <div className="scroll3"><Popularity /></div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import './App.css';
import Author from './components/author/Author';
import Popularity from './components/popularity/Popularity';
import Home from './components/home/Home';

function App() {
  const [showComponents, setShowComponents] = useState(false);

  const handleButtonClick = () => {
    setShowComponents(true);
  };

  return (
    <div className="App">
      <div className="scroll1">
        <Home onButtonClick={handleButtonClick} />
      </div>
      {showComponents && (
        <div className="scroll2">
          <Author />
        </div>
      )}
      {showComponents && (
        <div className="scroll3">
          <Popularity />
        </div>
      )}
    </div>
  );
}

export default App;
