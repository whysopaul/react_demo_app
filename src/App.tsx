import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import AlertContainer from './components/alerts/AlertContainer';
import { Suspense } from 'react';

const Home = React.lazy(() => import('./components/Home'))
const Images = React.lazy(() => import('./components/images/Images'))
const TestData = React.lazy(() => import('./components/testdata/TestData'))
const RePhraseHome = React.lazy(() => import('./components/rephrase/RePhraseHome'))
const RePhraseProject = React.lazy(() => import('./components/rephrase/RePhraseProject'))

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  // const [authWindow, setauthWindow] = React.useState(false)

  return <>
    <Suspense fallback={<p>Loading...</p>}>
      <Router>

        <Header />
        <AlertContainer />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/images" component={Images} />
          <Route exact path="/testdata" component={TestData} />
          <Route exact path="/rephrase" component={RePhraseHome} />
          <Route exact path="/rephrase/:id" component={RePhraseProject} />
        </Switch>

      </Router>
    </Suspense>
  </>
}

export default App;
