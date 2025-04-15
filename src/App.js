
import './App.css';
// App.js
import Header from './components/Header';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <div className='container'>
       <Navbar />
      <Header />     
      <Main />
      <Footer/>     
    </div>
  );
}

export default App;
