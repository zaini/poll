import React from 'react';

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
                pollID: "1",
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

    componentDidMount() {
        this.addEmptyQuestion();
    }

    render() {
        return (
            <div>
                {
                    this.state.poll.questions.map((question, qIndex) => {
                        let questionOptions = question.options.map((option, oIndex) => {
                            let optionBox = <input key={`q${qIndex}o${oIndex}`} name={`q${qIndex}o${oIndex}`} type='text' placeholder="type option here" value={option.value} onChange={(e) => this.changeOption(e.target.value, qIndex, oIndex)}/>;
                            let removeOptionButton = <button onClick={() => this.removeOption(qIndex, oIndex)}>x</button>
                            return [optionBox, removeOptionButton, <br/>]
                        })

                        let questionInput = <input key={`q${qIndex}`} name={`q${qIndex}`} type='text' placeholder="type question here" value={question.question} onChange={(e) => this.changeQuestion(e.target.value, qIndex)}/>;
                        let removeQuestion = <button onClick={() => this.removeQuestion(qIndex)}>x</button>;
                        let addOptionButton = <button onClick={() => this.addOption(qIndex)}>add option</button>;
                        return [questionInput, removeQuestion, <br/>, questionOptions, addOptionButton, <br/>, <br/>]
                    })
                }

                <br/><br/>
                <button onClick={() => this.addEmptyQuestion()}>add question</button>
                <br/>
                <input type='text' placeholder="type password here" onChange={(e) => this.changePassword(e.target.value)}/>
                <br/><br/>
                <button onClick={() => console.log(JSON.stringify(this.state.poll))}>submit</button>

                <br/><br/>
                {JSON.stringify(this.state.poll)}

            </div>
        )
    }
};
