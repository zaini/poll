import React from 'react';
import axios from "axios";
import ShareButtons from "./Share";

export default class PollResults extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            pollID: this.props.match.params.poll_id,
            poll: {}
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:5001/polls/${this.state.pollID}`).then(res => {
            if (res.data) {
                this.setState({
                    poll: res.data,
                })
            }
        })
    }

    render() {
        if (this.state.poll.questions){
            return (
                <div>
                    <h2>Poll Results</h2>
                    <br/>

                    {
                        this.state.poll.questions.map((question, qIndex) => {
                            let questionTitle = <p key={`q${qIndex}`} >{question.question}</p>;

                            let totalVotes = 0;
                            question.options.forEach(option => {
                                totalVotes += option.votes;
                            })
                            let votes = <p>Total Votes: {totalVotes}</p>

                            let options = question.options.map((option, oIndex) => {
                                let optionText = <div key={`q${qIndex}o${oIndex}`}>{option.value}
                                <span>{option.votes} votes | {option.votes === 0 ? 0 : Math.floor(100 * option.votes / totalVotes)}%</span>
                                </div>;
                                return [optionText]
                            })

                            return [questionTitle, options, votes, <br/>]
                        })
                    }

                    <button onClick={() => window.location.href = window.location.href.slice(0, -2)}>vote</button>

                    <ShareButtons shareUrl={window.location.href} />

                </div>
        )} else {
            return (
                <div>poll not found</div>
            )
        }
    }
};
