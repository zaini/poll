import React from 'react';
import axios from "axios";
import ShareButtons from "./Share";

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
        }, () => {
            axios.put(`http://localhost:5001/polls`, this.state.poll)
                .then(res => {
                    if (res.status === 200) {
                        alert(`Your vote has been submitted!`);
                        window.location.href = window.location.href + "/r";
                    } else{
                        alert("Something went wrong with submitting your vote. Please try again or contact the admin.");
                    }
                });
        });
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

                    <ShareButtons shareUrl={window.location.href} />
                </div>
            )
        } else {
            return (
                <div>poll not found</div>
            )
        }
    }
};
