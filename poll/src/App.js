import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.scss';
import CreatePoll from "./pages/CreatePoll";
import Poll from "./pages/Poll";
import PollResults from "./pages/PollResults";
import ErrorPage from "./components/ErrorPage";

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
                    <Switch>
                        <Route exact path={"/"} component={CreatePoll}/>
                        <Route exact path={"/:poll_id"} component={Poll}/>
                        <Route exact path={"/:poll_id/r"} component={PollResults}/>
                        <Route component={ErrorPage}/>
                    </Switch>
                </Router>

                {/*<Router>*/}
                {/*    <Route exact path={"/"} component={CreatePoll}/>*/}
                {/*    <Route path={"/:poll_id"} component={Poll}/>*/}
                {/*    <Route path={"/:poll_id/r"} component={PollResults}/>*/}
                {/*</Router>*/}

                <br/><br/>

                <footer>
                    <span>Ali Zaini &copy; 2020</span>
                    <span className="footer-links">
                            <a href="mailto:AliMZaini@outlook.com">Email</a> || <a
                        href="https://www.linkedin.com/in/ali-zaini/">LinkedIn</a> || <a
                        href="https://github.com/AliMZaini">GitHub</a>
                        </span>
                </footer>
            </div>
        )
    }
};
