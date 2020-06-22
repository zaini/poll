import React from 'react';
import './App.scss';

export default class App extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>poll</h1>
                <input type='text' placeholder="type question here" /> <br/>
                <input type='text' placeholder="type option here" /> <br/>
                <input type='text' placeholder="type option here" /> <br/>
                <input type='text' placeholder="type option here" /> <br/>
                <button>add option</button> <br/>
                <button>add question</button> <br/>
                <input type='text' placeholder="type password here" /> <br/>
            </div>
        )
    }
};
