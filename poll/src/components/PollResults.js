import React from 'react';

export default class PollResults extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            poll: {"_id":{"$oid":"5ef412adc42f605bf078ed2d"},"pollID":"1","password":"password1234","questions":[{"required":true,"options":[{"type":"short-text","votes":2,"value":"This one"},{"type":"short-text","votes":0,"value":"That one"},{"type":"short-text","votes":0,"value":"Other one"}],"question":"Which one?"},{"required":true,"options":[{"type":"short-text","votes":0,"value":"1"},{"type":"short-text","votes":0,"value":"2"},{"type":"short-text","votes":0,"value":"3"}],"question":"Another one"}]}
        };
    }

    render() {
        return (
            <div>
                <h2>Poll Results</h2>
                <br/>

                poll results for {this.props.match.params.poll_id}
                <br/>
                pollID: {this.state.poll.pollID}
                <br/>
                password: {this.state.poll.password}
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
            </div>
        )
    }
};
