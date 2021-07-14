import React from 'react';
import SimpleBar from './components/SimpleBar'

if(module.hot){
  module.hot.accept();
}

const App = () => {


  return (
    <div>App
      <SimpleBar/>
    </div>
  )
}

export default App;