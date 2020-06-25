import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.scss';
import CreatePoll from "./components/CreatePoll";
import Poll from "./components/Poll";
import PollResults from "./components/PollResults";

export default class App extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{margin: "auto", width: "50%"}}>
                <h1>Poll</h1>
                <h2>Create Poll</h2>
                <Router>
                    <Route exact path={"/"} component={CreatePoll}/>
                    <Route exact path={"/:poll_id"} component={Poll}/>
                    <Route exact path={"/:poll_id/r"} component={PollResults}/>
                </Router>

            </div>
        )
    }
};
