import React, { Component } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import Header from "./assets/components/header";
import Block from "./assets/components/blockViewer";
import Footer from "./assets/components/footer";
import './assets/styles/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <Router>
          <Header />
          <main className="main">
            <Switch>
              <Route path="/block/:blockId">
                <Block></Block>
              </Route>
              <Route path="/">
                <Block></Block>
              </Route>
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
