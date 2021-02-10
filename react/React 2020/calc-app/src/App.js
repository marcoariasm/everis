import {useState} from 'react';
import './App.css';

import Functions from './components/Functions'
import MathOperations from './components/MathOperations'
import Numbers from './components/Numbers'
import Result from './components/Result';|

import PropTypes from 'prop-types';

function App() {
  console.log("renderización de App");
  const [result, setResult] = useState(0);

  return (
    <main className="react-calculator">
      <Result value={result} />
      <Numbers onClickNumber={setResult}/>
      <Functions 
        onContentClear={clear => console.log(clear)}
        onDelete={del => console.log(del)}
      />
      <MathOperations 
        onClickOperation={operation => console.log(operation)} 
        onClickEqual={equal => console.log(equal)} 
      />
    </main>
  );
}

Result.propTypes = {
  value: PropTypes.string.isRequired
}

Result.defaultProps = {
  value: "0"
}

export default App;
