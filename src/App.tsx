import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Popup from './components/images/Popup';
import Search from './components/tests/Search';
import TestData from './components/testdata/TestData';
import vladik from './components/tests/vladik';
import TestReducer from './components/tests/TestReducer';
import AlertContainer from './components/alerts/AlertContainer';
import RePhrase from './components/rephrase/RePhrase';
import Images from './components/images/Images';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  // const [authWindow, setauthWindow] = React.useState(false)
  return <>
    <Router>

      <Header />
      <AlertContainer />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/images" component={Images} />
        {/* <Route exact path="/vladik" component={vladik} /> */}
        {/* <Route exact path="/popup/in" component={Popup} /> */}
        <Route exact path="/testdata" component={TestData} />
        {/* <Route exact path="/search" component={Search} /> */}
        {/* <Route exact path="/testr" component={TestReducer} /> */}
        <Route exact path="/rephrase" component={RePhrase} />
      </Switch>

    </Router>
  </>
}

export default App;
