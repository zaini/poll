import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.scss';
import CreatePoll from "./components/CreatePoll";
import Poll from "./components/Poll";
import PollResults from "./components/PollResults";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'main-container'}>
                <div style={{textAlign: "center"}}>
                    <h1 className='title'><a href="/">Poll</a></h1>
                </div>
                <br/>
                <Router>
                    <Route exact path={"/"} component={CreatePoll}/>
                    <Route exact path={"/:poll_id"} component={Poll}/>
                    <Route exact path={"/:poll_id/r"} component={PollResults}/>
                </Router>

                <br/><br/>

                {/*<a href="/27">example poll</a>*/}
                {/*<br/>*/}
                {/*<a href="/27/r">example results</a>*/}

                <footer>
                        <span>Ali Zaini &copy; 2020</span>
                        <span className="footer-links">
                            <a href="mailto:AliMZaini@outlook.com">Email</a> || <a href="https://www.linkedin.com/in/ali-zaini/">LinkedIn</a> || <a href="https://github.com/AliMZaini">GitHub</a>
                        </span>
                </footer>
            </div>
        )
    }
};
