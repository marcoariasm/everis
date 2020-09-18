import React, { useState } from 'react'
import Result from './components/Result'
import PropTypes from 'prop-types'
import Numbers from './components/Numbers'
import Operations from './components/Operations'
import './App.css'

const App = () => {

    const [num, setNum] = useState("0")

    return (
        <main className='react-calculator'>
            <Result value={num}/>
            <Numbers onClickNumber={(num) => setNum(num)}/>
            <Operations onClickOperation={() => console.log("clic en Operation")} />
        </main>)
}

export default App