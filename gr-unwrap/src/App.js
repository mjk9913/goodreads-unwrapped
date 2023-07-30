import './App.css';
import Author from './components/author/Author.jsx';
import Obscurity from './components/obscurity/Obscurity.jsx';

function App() {
  return (
    <div className="App">
      <div class="scroll1"><Author /></div>
      <div class="scroll2"><Obscurity /></div>
    </div>
  );
}

export default App;
