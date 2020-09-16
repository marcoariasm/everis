import React, { useState } from 'react'
import Functions from './components/Functions'
import MathOperations from './components/MathOperations'
import Numbers from './components/Numbers'
import Result from './components/Result'
// import Button from './components/button/Button'
import './App.css'

// Función Flecha o Arrow Function
const App = () => {

    // const [state, setstate] = useState(initialState)

    // entendiendo la llamada a la función  useState
    const arrayTextoFuncionModificaTexto = useState("")
    // arrayTextoFuncionModificaTexto = ["", funcion]
    const texto = arrayTextoFuncionModificaTexto[0]
    const funcionModificaTexto = arrayTextoFuncionModificaTexto[1]

    // const clickHandlerFunction = (text) => {
    //     console.log("esto se ejecuta en al App", text);
    // }

    // Lo que ejecuta la función
    // debugger
    console.log("Renderización de App")
    return (
      <main className='react-calculator'>
        <Result value={ texto } />
                {/* // text="ay" */}
                {/* // prop={true} */}
                {/* ></Result> */}
        {/* <div className="numbers">
            <Button text="1" clickHandler={clickHandlerFunction} />
            <Button text="2" clickHandler={clickHandlerFunction} />
            <Button text="3" clickHandler={clickHandlerFunction} />
            <Button text="4" clickHandler={clickHandlerFunction} />
            <Button text="5" clickHandler={clickHandlerFunction} />
            <Button text="6" clickHandler={clickHandlerFunction} />
            <Button text="7" clickHandler={clickHandlerFunction} />
            <Button text="8" clickHandler={clickHandlerFunction} />
            <Button text="9" clickHandler={clickHandlerFunction} />
            <Button text="0" clickHandler={clickHandlerFunction} />
        </div> */}
        <Numbers onClickNumber={number => {
            console.log('Element ', number)
            funcionModificaTexto(number)
        }}/>
        <Functions 
            onContentClear = {() => console.log("Content Clear")} 
            onDelete = {() => console.log("Delete")} />
        <MathOperations 
            onClickOperation={ operation => {console.log("Operation: ", operation)}}
            onClickEqual={ equal => {console.log("Equal: ", equal);}} />
    </main>)
}

export default App

