import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import StartView from './views/StartView'
import TestView from './views/TestView';
import getImages from './images/images'
import './App.css';
import TextView from './views/TextView';
import DrawingView from './views/DrawingView';
import EntriesReportView from './views/EntriesReportView'
import TestEntry from './components/TestEntry'

function App() {
  const entry = new TestEntry()
  
  return (
    <Router>
      <Switch>
        <Route path='/text0' exact component={() => <TextView testPhase={0} testEntry={entry}/>} />
        <Route path='/text1' exact component={() => <TextView testPhase={1} testEntry={entry}/>} />
        <Route path='/text2' exact component={() => <TextView testPhase={2} testEntry={entry}/>} />
        <Route path='/text3' exact component={() => <TextView testPhase={3} testEntry={entry}/>} />
        <Route path='/test0' exact component={() => <TestView images={getImages(0)} time={300000} testPhase={0} testEntry={entry} />} />
        <Route path='/test1' exact component={() => <TestView images={getImages(1)} time={600000} testPhase={1} testEntry={entry} />} />
        <Route path='/test2' exact component={() => <DrawingView images={getImages(2)} time={60000} testPhase={2} testEntry={entry} />} />
        <Route path='/report' exact component={() => <EntriesReportView />} />
        <Route path='/' exact component={() => <StartView testEntry={entry} />} />
      </Switch>
    </Router>
  )
}

export default App;
