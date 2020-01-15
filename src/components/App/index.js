import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavBar from '../Navbar'
import Manager from '../Manager'
import Transcribe from '../Transcribe'
import { Container } from "@material-ui/core";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Container style={{marginTop:'0.5rem'}}>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Manager />
          </Route>
          <Route path="/manager">
            <Manager />
          </Route>
          <Route path="/transcribe/:id" children={<Transcribe />}>

          </Route>

        </Switch>
      </Container>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

