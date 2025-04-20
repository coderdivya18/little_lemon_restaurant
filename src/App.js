
import './App.css';
// App.js

import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import Specials from './components/Specials';

function App() {
  return (
    <div className='container'>
       <Navbar />      
      <Main />
      <Specials/>
      <Footer/>     
    </div>
  );
}

export default App;
