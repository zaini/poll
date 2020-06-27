import React from 'react';
import axios from "axios";

export default class Poll extends React.Component {
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
        //() => window.location.href = window.location.href + "/r"
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
                                let optionText = <div key={`q${qIndex}o${oIndex}`}
                                                      onClick={() => this.voteOption(qIndex, oIndex)}>{option.value}</div>;

                                return [optionText]
                            })

                            return [questionTitle, options, <br/>]
                        })
                    }

                    <br/><br/>
                    <button onClick={() => this.submitVote()}>vote</button>
                    <button onClick={() => window.location.href = window.location.href + "/r"}>results</button>
                    <button onClick={() => console.log(JSON.stringify(this.state.poll))}>share</button>

                </div>
            )
        } else {
            return (
                <div>poll not found</div>
            )
        }
    }
};
