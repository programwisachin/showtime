import './App.css';
import Navbar from './Components/Navbar';
import ShowMovie from './Components/ShowMovie';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import ShowTV from './Components/ShowTV';

function App() {

  const apiKey = process.env.REACT_APP_MOVIES_API
  return (
    <>
      <Router>
    <Navbar/>
      <Switch>
          <Route exact path="/">
            <ShowMovie apiKey = {apiKey} />
          </Route>
          <Route exact path="/tvshow">
            <ShowTV apiKey = {apiKey} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
