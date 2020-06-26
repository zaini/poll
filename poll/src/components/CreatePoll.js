import React from 'react';
import axios from "axios";

export default class CreatePoll extends React.Component{
    emptyQuestionObject;

    constructor(props) {
        super(props);

        this.emptyQuestionObject = {
            required: true,
            question: undefined,
            options: [{type: "short-text", value: undefined, votes: 0}, {type: "short-text", value: undefined, votes: 0}, {type: "short-text", value: undefined, votes: 0}]
        };

        this.state = {
            poll: {
                password: null,
                DoC: undefined,
                DoD: undefined,
                questions: []
            }
        };
    }

    changeOption = (value, qIndex, oIndex) => {
        let poll = JSON.parse(JSON.stringify(this.state.poll));
        poll.questions[qIndex].options[oIndex].value = value;
        this.setState({
            poll: poll
        });
    }

    addOption = (qIndex) => {
        let poll = JSON.parse(JSON.stringify(this.state.poll));
        poll.questions[qIndex].options.push({type: "short-text", value: undefined, votes: 0});
        console.log(poll.questions);
        this.setState({
            poll: poll
        });
    }

    removeOption = (qIndex, oIndex) => {
        let poll = JSON.parse(JSON.stringify(this.state.poll));
        poll.questions[qIndex].options.splice(oIndex, 1);
        this.setState({
            poll: poll
        });
    }

    changeQuestion = (value, qIndex) => {
        let poll = JSON.parse(JSON.stringify(this.state.poll));
        poll.questions[qIndex].question = value;
        this.setState({
            poll: poll
        });
    }

    addEmptyQuestion = () => {
        let poll = JSON.parse(JSON.stringify(this.state.poll));
        poll.questions.push(JSON.parse(JSON.stringify(this.emptyQuestionObject)));
        this.setState({
            poll: poll
        });
    }

    removeQuestion = (index) => {
        console.log(index);
        let poll = JSON.parse(JSON.stringify(this.state.poll));
        poll.questions.splice(index, 1);
        this.setState({
            poll: poll
        });
    }

    changePassword = (value) => {
        let poll = JSON.parse(JSON.stringify(this.state.poll));
        poll.password = value;
        this.setState({
            poll: poll
        });
    }

    submitPoll = () => {
        axios.post(`http://localhost:5001/polls`, this.state.poll)
            .then(res => {
                if (res.status === 200) {
                    alert(`Your poll has been posted! \nID: ${res.data.id}`);
                    window.location.href = res.data.id;
                } else{
                    alert("Something went wrong with posting your poll. Please try again or contact the admin.");
                }
            });
    }

    componentDidMount() {
        this.addEmptyQuestion();
    }

    render() {
        return (
            <div>
                <h2>Create Poll</h2>
                <br/>
                {
                    this.state.poll.questions.map((question, qIndex) => {
                        let questionOptions = question.options.map((option, oIndex) => {
                            let optionBox = <input key={`q${qIndex}o${oIndex}`} name={`q${qIndex}o${oIndex}`} type='text' placeholder="type option here" value={option.value} onChange={(e) => this.changeOption(e.target.value, qIndex, oIndex)}/>;
                            let removeOptionButton = <button onClick={() => this.removeOption(qIndex, oIndex)}>remove</button>
                            return [optionBox, removeOptionButton, <br/>]
                        })

                        let questionInput = <input key={`q${qIndex}`} name={`q${qIndex}`} type='text' placeholder="type question here" value={question.question} onChange={(e) => this.changeQuestion(e.target.value, qIndex)}/>;
                        let removeQuestion = <button onClick={() => this.removeQuestion(qIndex)}>remove</button>;
                        let addOptionButton = <button className="addButton" onClick={() => this.addOption(qIndex)}>add option</button>;
                        return [questionInput, removeQuestion, <br/>, questionOptions, addOptionButton, <br/>, <br/>]
                    })
                }

                <button className="addButton" onClick={() => this.addEmptyQuestion()}>add question</button>
                <br/><br/>
                <input className="password" type='password' placeholder="type password here" onChange={(e) => this.changePassword(e.target.value)}/>
                <br/><br/>
                <button onClick={() => this.submitPoll()}>submit</button>
                <button onClick={() => console.log(JSON.stringify(this.state.poll))}>results</button>
                <button onClick={() => console.log(JSON.stringify(this.state.poll))}>share</button>

                <br/><br/>
                {JSON.stringify(this.state.poll)}

            </div>
        )
    }
};
