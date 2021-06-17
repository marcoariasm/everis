// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  
  const initialState = null;

  const [state, setstate] = useState(initialState)
  
  console.log("1 Inicio de aplicación");

  useEffect(()=>{
    console.log("2 useEffect activado"); 
  });

  useEffect(()=>{
    console.log("4 estado cambiado");
    if (state===5)
      console.log("5 hook de botón activado"); 
  }, [state])

  const clickHandler = () => {
    let copy = state?state:1;
    setstate(copy+1);
    console.log("3 botón presionado");
  }

  return (
    <div className="App">
      "Hola Mundo"<br />
      <button onClick={() => clickHandler()}>Cambiar estado</button>
    </div>
  );
}

export default App;
