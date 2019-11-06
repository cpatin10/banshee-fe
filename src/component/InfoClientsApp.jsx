import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListCustomersComponent from './ListCustomersComponent';
import CustomerComponent from './CustomerComponent';

class InfoClientsApp extends Component {

    render() {
        return (
            <Router>
            <>
              <h1>Info Clients</h1>
              <Switch>
                    <Route path="/" exact component={ListCustomersComponent} />
                    <Route path="/customers" exact component={ListCustomersComponent} />
                    <Route path="/customers/:id" component={CustomerComponent} />
                </Switch>
            </>
            </Router>
        )
    }

}

export default InfoClientsApp