import React, { Component } from "react";
import './assets/styles/styles.css';
import {
  Switch,
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import Header from "./assets/components/header";
import Block from "./assets/components/blockViewer";
import Footer from "./assets/components/footer";

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log('App.js render');
    return (
      <div className="wrapper">
        <Router>
          <Header></Header>
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
          <Footer>
          </Footer>
        </Router>
      </div>
    );
  }
}

export default App;
