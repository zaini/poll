import React from 'react';
import axios from "axios";

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

                            let options = question.options.map((option, oIndex) => {
                                let optionText = <li key={`q${qIndex}o${oIndex}`}>{option.value} got {option.votes} votes</li>;
                                return [optionText]
                            })

                            return [questionTitle, options, <br/>]
                        })
                    }

                    <button onClick={() => window.location.href = window.location.href.slice(0, -2)}>vote</button>
                </div>
        )} else {
            return (
                <div>poll not found</div>
            )
        }
    }
};
