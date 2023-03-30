import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Popup from './components/Popup';
import TestData from './components/TestData';
import vladik from './components/vladik';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const [authWindow, setauthWindow] = React.useState(false)
  return <>
    <Header />
    <Router>


      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/vladik" component={vladik} />
        <Route exact path="/popup/in" component={Popup} />
        <Route exact path="/testdata" component={TestData} />


      </Switch>

    </Router>
  </>
}

export default App;
