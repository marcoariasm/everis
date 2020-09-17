import React, { useState } from 'react'
import words from 'lodash.words'
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
    // arrayTextoFuncionModificaTexto = ["", funcion]
    const [stack, setStack] = useState("")

    const items = words(stack, /[^-^+^*^/]+/g)

    // const clickHandlerFunction = (text) => {
    //     console.log("esto se ejecuta en al App", text);
    // }

    // Lo que ejecuta la función
    // debugger
    const value = items.length > 0 ? items[items.length-1]: 0;
    console.log("Renderización de App", value)
    return (
      <main className='react-calculator'>
        <Result value={ items[items.length-1] } />
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
            setStack(`${stack}${number}`)
        }}/>
        <Functions 
            onContentClear = {() => {console.log("Content Clear")
                                     setStack('')}} 
            onDelete = {() => { if (stack.length>0) {
                                console.log("Delete")
                                const newStack = stack.substring(0, stack.length-1)
                                setStack(newStack)
                            }}} />
        <MathOperations 
            onClickOperation={ operation => {console.log("Operation: ", operation)
                                            setStack(`${stack}${operation}`)}}
            onClickEqual={ equal => {console.log("Equal: ", equal);
                                     setStack(eval(stack).toString())
                                    }} />
    </main>)
}

export default App

