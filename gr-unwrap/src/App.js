import './App.css';
import Author from './components/author/Author';
import Popularity from './components/popularity/Popularity'

function App() {
  return (
    <div className="App">
      <div className="scroll1"><Author /></div>
      <div className="scroll2"><Popularity /></div>
    </div>
  );
}

export default App;
