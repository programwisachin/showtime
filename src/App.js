import './App.css';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import requests from './requests'
import Poster from './Components/Poster';
import Banner from './Components/Banner';

function App() {

  return (
    <div className="app">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">  {/*banner and posters*/}
            <Banner fetchUrl={requests.fetchNetfixOriginal} />
            <Poster title="Trending" fetchUrl={requests.fetchTrending} poster />
            <Poster title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Poster title="Netfix Originals" fetchUrl={requests.fetchNetfixOriginal} poster/>
            <Poster title="Action Movies" fetchUrl={requests.fetchActionMovie} />
            <Poster title="Comedy Movies" fetchUrl={requests.fetchComedyMovie} />
            <Poster title="Horror Movies" fetchUrl={requests.fetchHorrorMovie} />
            <Poster title="Romance Movies" fetchUrl={requests.fetchRomanceMovie} />
            <Poster title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
