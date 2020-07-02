import React from 'react';
import axios from "axios";

const bcrypt = require('bcryptjs');

export default class CreatePoll extends React.Component {
    emptyQuestion = {
        required: true,
        question: undefined,
        options: [{type: "short-text", value: undefined, votes: 0},
            {type: "short-text", value: undefined, votes: 0},
            {type: "short-text", value: undefined, votes: 0}]
    };

    constructor(props) {
        super(props);

        this.state = {
            poll: {
                password: null,
                DoC: undefined,
                DoD: undefined,
                questions: []
            }
        };
    }

    getPollClone = () => {
        return JSON.parse(JSON.stringify(this.state.poll));
    }

    setOption = (value, qIndex, oIndex) => {
        let poll = this.getPollClone();
        poll.questions[qIndex].options[oIndex].value = value;
        this.setState({
            poll: poll
        }, () => {
            if (poll.questions[qIndex].options.length === oIndex + 1) {
                this.addOption(qIndex);
            }
        });
    }

    addOption = (qIndex) => {
        let poll = this.getPollClone();
        poll.questions[qIndex].options.push({type: "short-text", value: undefined, votes: 0});
        this.setState({
            poll: poll
        });
    }

    removeOption = (qIndex, oIndex) => {
        let poll = this.getPollClone();
        poll.questions[qIndex].options.splice(oIndex, 1);
        this.setState({
            poll: poll
        });
    }

    setQuestion = (value, qIndex) => {
        let poll = this.getPollClone();
        poll.questions[qIndex].question = value;
        this.setState({
            poll: poll
        });
    }

    addQuestion = () => {
        let poll = this.getPollClone();
        poll.questions.push(JSON.parse(JSON.stringify(this.emptyQuestion)));
        this.setState({
            poll: poll
        });
    }

    removeQuestion = (index) => {
        let poll = this.getPollClone();
        poll.questions.splice(index, 1);
        this.setState({
            poll: poll
        });
    }

    setQuestionRequirement = (qIndex, required) => {
        let poll = this.getPollClone();
        poll.questions[qIndex].required = required;
        this.setState({
            poll: poll
        });
    }

    setPassword = (value) => {
        let poll = this.getPollClone();
        poll.password = value;
        this.setState({
            poll: poll
        });
    }

    /**
     * A valid poll:
     * every question has at least one option
     * has at least one question
     * has no blank questions or options
     */
    isPollValid = () => {
        let poll = this.getPollClone();

        let containsQuestions = poll.questions.length > 0;

        let numberOfOptionsPerQuestion = poll.questions.map(question => question.options.length);
        let questionsContainOptions = !numberOfOptionsPerQuestion.includes(0);

        let optionsAreValid = false;
        let questionsAreValid = false;
        if (questionsContainOptions) {
            let optionsPerQuestion = poll.questions.map(question => question.options);
            let validatedOptionsPerQuestion = optionsPerQuestion.map(options => {
                return options.map(option => option.value !== undefined && option.value !== "")
            })

            optionsAreValid = !validatedOptionsPerQuestion.map(a => a.includes(false)).includes(true);

            let questionPerQuestion = poll.questions.map(question => question.question);
            let validatedQuestionsPerQuestion = questionPerQuestion.map(question => {
                return question !== undefined && question !== ""
            })

            questionsAreValid = !validatedQuestionsPerQuestion.includes(false);
        }

        let isPollValid = containsQuestions && questionsContainOptions && optionsAreValid && questionsAreValid;
        return isPollValid;
    }

    encryptPoll = () => {
        let poll = this.getPollClone();

        let password = poll.password;
        let that = this;

        if (password === null || password === "") {
            poll.password = null;
            this.setState({
                poll: poll
            })
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    poll.password = hash;
                    that.setState({
                        poll: poll
                    })
                });
            });
        }
    }

    submitPoll2 = () => {
        if (this.isPollValid()) {
            let poll = this.getPollClone();

            let password = poll.password;
            let that = this;

            if (password === null || password === "") {
                poll.password = null;
                this.setState({
                    poll: poll
                }, () => {
                    axios.post(`http://localhost:5001/polls`, this.state.poll)
                        .then(res => {
                            if (res.status === 200) {
                                alert(`Your poll has been posted! \nID: ${res.data.id}`);
                                window.location.href = res.data.id;
                            } else {
                                alert("Something went wrong with posting your poll. Please try again or contact the admin.");
                            }
                        });
                })
            } else {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        poll.password = hash;
                        that.setState({
                            poll: poll
                        }, () => {
                            axios.post(`http://localhost:5001/polls`, that.state.poll)
                                .then(res => {
                                    if (res.status === 200) {
                                        alert(`Your poll has been posted! \nID: ${res.data.id}`);
                                        window.location.href = res.data.id;
                                    } else {
                                        alert("Something went wrong with posting your poll. Please try again or contact the admin.");
                                    }
                                });
                        })
                    });
                });
            }
        } else {
            alert("Poll cannot contain empty questions or options.\nPoll must contain at least one question.\nAll questions must contain at least one option.");
        }
    }

    submitPoll = () => {
        if (this.validatePoll()) {
            this.encryptPoll();
            axios.post(`http://localhost:5001/polls`, this.state.poll)
                .then(res => {
                    if (res.status === 200) {
                        alert(`Your poll has been posted! \nID: ${res.data.id}`);
                        window.location.href = res.data.id;
                    } else {
                        alert("Something went wrong with posting your poll. Please try again or contact the admin.");
                    }
                });
        } else {
            alert("Poll cannot contain empty questions or options.\nPoll must contain at least one question.\nAll questions must contain at least one option.");
        }
    }

    componentDidMount() {
        this.addQuestion();
    }

    render() {
        return (
            <div>
                <h2>Create Poll</h2>
                <br/>
                {
                    this.state.poll.questions.map((question, qIndex) => {
                        let questionInput = <input key={`q${qIndex}`} name={`q${qIndex}`} type='text'
                                                   placeholder="type question here" value={question.question}
                                                   onChange={(e) => this.setQuestion(e.target.value, qIndex)}/>;
                        let questionLabel = <label htmlFor={`q${qIndex}`}>Question</label>;
                        let removeQuestion = <button onClick={() => this.removeQuestion(qIndex)}>remove</button>;

                        let requiredCheckbox = <input type='checkbox'
                                                      checked={this.state.poll.questions[qIndex].required}
                                                      onChange={(e) => this.setQuestionRequirement(qIndex, e.target.checked)}/>;

                        let questionOptions = question.options.map((option, oIndex) => {
                            let optionBox = <input key={`q${qIndex}o${oIndex}`} name={`q${qIndex}o${oIndex}`}
                                                   type='text' placeholder="type option here" value={option.value}
                                                   onChange={(e) => this.setOption(e.target.value, qIndex, oIndex)}/>;
                            let removeOptionButton = <button
                                onClick={() => this.removeOption(qIndex, oIndex)}>remove</button>;
                            return [optionBox, removeOptionButton, <br/>]
                        })

                        let addOptionButton = <button onClick={() => this.addOption(qIndex)}>add option</button>;

                        return [questionLabel, <br/>, questionInput, removeQuestion,
                            <br/>, questionOptions, addOptionButton, <p>required {requiredCheckbox}</p>, <br/>, <br/>]
                    })
                }

                <button onClick={() => this.addQuestion()}>add question</button>
                <br/><br/>
                <input type='password' placeholder="type password here"
                       onChange={(e) => this.setPassword(e.target.value)}/>
                <br/><br/>

                <div className={'bottom-buttons'}>
                    <button onClick={() => this.submitPoll2()}>submit</button>
                </div>
            </div>
        )
    }
};
