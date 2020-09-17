import React, { useState } from 'react'
import Result from './components/Result'
import PropTypes from 'prop-types'
import Numbers from './components/Numbers'
import './App.css'

const App = () => {

    const [num, setNum] = useState("0")

    return (
        <main className='react-calculator'>
            <Result value={num}/>
            <Numbers onClickHandler={(num) => setNum(num)}/>
        </main>)
}

export default App