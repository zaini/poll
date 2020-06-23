import React from 'react';
import './App.scss';

export default class App extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            values: ["", "", ""],
            poll: {
                pollID: "1",
                password: "password123",
                DoC: "10:09:00 11//11/2011",
                DoD: "11:10:10 12/11/2011",
                questions: [{
                    required: true,
                    question: "Which one?",
                    options: [{type: "short-text", value: "this"}, {type: "short-text", value: "that"}, {type: "short-text", value: "these"}]
                }, {
                    required: false,
                    question: "Which other one?",
                    options: [{type: "short-text", value: "mhm"}, {type: "short-text", value: "hmm"}, {type: "short-text", value: "hmmm"}]
                }]
            }
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
                {
                    [this.state.poll.pollID, <br/>, this.state.poll.password, <br/>, this.state.poll.DoC, <br/>, this.state.poll.DoD]
                }
                <br/>
                {
                    this.state.poll.questions.map((question, qIndex) => {
                        return [question.question, ` required: ${question.required}`, <br/>, question.options.map((option, oIndex) => {
                            return [option.value, <br/>];
                        }) ,<br/>]
                    })
                }
                {
                    <button type={"submit"}>vote</button>
                }

                <br/><br/>
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
