import React from 'react';
import axios from "axios";

export default class Poll extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
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

    submitVote = () => {
        // TODO check everything required has been voted on, otherwise you don't have to count it
        let poll = JSON.parse(JSON.stringify(this.state.poll));
        this.state.votes.forEach((option, qIndex) => {
            poll.questions[qIndex].options[option].votes++;
        })
        this.setState({
            poll: poll
        }, () => console.log(this.state.poll));
    }

    componentDidMount() {
        axios.get(`http://localhost:5001/polls/${this.state.pollID}`).then(res => {
            if (res.data) {
                this.setState({
                    poll: res.data,
                    votes: Array(res.data.questions.length)
                })
            }
        })
    }

    render() {
        if (this.state.poll.questions) {
            return (
                <div>
                    <h2>Vote on Poll</h2>
                    <br/>

                    {
                        this.state.poll.questions.map((question, qIndex) => {
                            let questionTitle = <p key={`q${qIndex}`}>{question.question}</p>;

                            let options = question.options.map((option, oIndex) => {
                                let optionText = <li key={`q${qIndex}o${oIndex}`}
                                                     onClick={() => this.voteOption(qIndex, oIndex)}>{option.value}</li>;
                                return [optionText]
                            })

                            return [questionTitle, options, <br/>]
                        })
                    }

                    <button onClick={() => this.submitVote()}>submit</button>

                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    poll {this.state.pollID}
                    <br/>
                    pollID: {this.state.poll.pollID}
                    <br/>
                    password: {this.state.poll.password}
                </div>
            )
        } else{
            return (
                <div>poll not found</div>
            )
        }
    }
};
