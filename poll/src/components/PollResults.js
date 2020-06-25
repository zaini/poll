import React from 'react';

export default class PollResults extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Poll Results</h2>
                poll results for {this.props.match.params.poll_id}

            </div>
        )
    }
};
