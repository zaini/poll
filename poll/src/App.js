import React from 'react';
import './App.scss';

export default class App extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            values: ["", "", ""]
        }
    }

    addOption = () => {
        this.setState({
            values: [...this.state.values, ""]
        })
    }

    removeOption = (index) => {
        console.log(index);
        let values = [...this.state.values];
        values.splice(index, 1);
        this.setState({
            values: values
        })
    }

    changeValue = (e) => {
        let values = [...this.state.values];
        values[e.target.name] = e.target.value;
        this.setState({
            values: values
        })
    }

    render() {
        return (
            <div>
                <h1>poll</h1>
                <input type='text' placeholder="type question here" /> <br/>
                {
                    this.state.values.map((value, index) => {
                        let option = <input key={index} name={index} type='text' placeholder="type option here" value={value} onChange={this.changeValue}/>;
                        let remove = <button onClick={() => this.removeOption(index)}>x</button>
                        return [option, remove, <br/>]
                    })
                }
                <button onClick={() => this.addOption()}>add option</button> <br/>
                <button>add question</button> <br/>
                <input type='text' placeholder="type password here" /> <br/>
            </div>
        )
    }
};
