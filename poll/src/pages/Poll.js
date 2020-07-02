import React from 'react';
import axios from "axios";
import ShareButtons from "../components/Share";
import ErrorPage from "../components/ErrorPage";
import PasswordEntry from "../components/PasswordEntry";
import Cookies from 'universal-cookie';

const bcrypt = require('bcryptjs');
const cookies = new Cookies();

export default class Poll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validPassword: false,
            pollID: this.props.match.params.poll_id,
            poll: {}
        };
    }

    voteOption = (qIndex, oIndex) => {
        let votes = [...this.state.votes];
        votes[qIndex] = oIndex;
        this.setState({
            votes: votes
        });
    }

    setPassword = (password) => {
        this.setState({
            password: password
        });
    }

    submitPassword = () => {
        let enteredPassword = this.state.password;
        let hashedPassword = this.state.poll.password;
        let that = this;
        bcrypt.compare(enteredPassword, hashedPassword, (err, res) => {
            that.setState({
                validPassword: res
            });
        });
    }

    isPollValid = (poll) => {
        let isValid = true;
        poll.questions.forEach((question, qIndex) => {
            if (question.required && this.state.votes[qIndex] === undefined) {
                isValid = false;
            }
        })
        return isValid
    }

    putVote = () => {
        axios.put(`http://localhost:5001/polls`, this.state.poll)
            .then(res => {
                if (res.status === 200) {
                    if (cookies.get('votedOn') !== undefined) {
                        cookies.set('votedOn', [...cookies.get('votedOn'), res.data.pollID]);
                    } else {
                        cookies.set('votedOn', [res.data.pollID]);
                    }
                    alert(`Your vote has been submitted!`);
                    window.location.href = window.location.href + "/r";
                } else {
                    alert("Something went wrong with submitting your vote. Please try again or contact the admin.");
                }
            });
    }

    submitVote = () => {
        if (cookies.get('votedOn') !== undefined && cookies.get('votedOn').includes(this.state.pollID)) {
            alert("You have already voted on this poll and so cannot do so again.");
            return
        }

        let poll = JSON.parse(JSON.stringify(this.state.poll));

        if (!this.isPollValid(poll)) {
            alert(`You must respond to all required questions.`);
            return
        }

        this.state.votes.forEach((option, qIndex) => {
            poll.questions[qIndex].options[option].votes++;
        })

        this.setState({
            poll: poll
        }, () => this.putVote());
    }

    componentDidMount() {
        axios.get(`http://localhost:5001/polls/${this.state.pollID}`).then(res => {
            if (res.data) {
                let poll = res.data;
                this.setState({
                    poll: poll,
                    votes: Array(poll.questions.length),
                    validPassword: poll.password === null
                })
            }
        })
    }

    render() {
        if (this.state.poll.questions) {
            if (this.state.validPassword) {
                return (
                    <div>
                        <h2>Vote on Poll</h2>
                        <br/>

                        {
                            this.state.poll.questions.map((question, qIndex) => {
                                let questionTitle = <p
                                    key={`q${qIndex}`}>{question.question} {question.required ? "(required)" : null}</p>;

                                let options = question.options.map((option, oIndex) => {
                                    let optionText = <div className={'result-option'} key={`q${qIndex}o${oIndex}`}
                                                          style={this.state.votes[qIndex] === oIndex ? {
                                                              backgroundColor: "#464646",
                                                              color: "white"
                                                          } : null}
                                                          onClick={() => this.voteOption(qIndex, oIndex)}>{option.value}</div>;

                                    return [optionText]
                                })

                                return [questionTitle, options, <br/>]
                            })
                        }

                        <br/><br/>

                        <div className={'bottom-buttons'}>
                            <button onClick={() => this.submitVote()}>vote</button>
                            <button onClick={() => window.location.href = window.location.href + "/r"}>results</button>
                        </div>

                        <br/><br/>

                        <ShareButtons shareUrl={window.location.href}/>
                    </div>
                )
            } else {
                return (
                    <PasswordEntry passwordValue={this.state.password}
                                   changeEnteredPassword={(value) => this.setPassword(value)}
                                   submitPassword={() => this.submitPassword()}/>
                )
            }
        } else {
            return (
                <ErrorPage/>
            )
        }
    }
};
