import React, { useState } from 'react'
import Result from './components/Result'
import PropTypes from 'prop-types'
import Numbers from './components/Numbers'
import './App.css'

const App = () => {

    const [num, setNum] = useState("")

    return (
        <main className='react-calculator'>
            <Result />
            <Numbers value="" clickHandler=""/>
        </main>)
}

export default App