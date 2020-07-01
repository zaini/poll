import React from 'react';

export default class ErrorPage extends React.Component {
    render() {
        return (
            <div className={'error'}>
                <h1>The requested page was not found.</h1>
                <h2>Check that the link you have requested is for a valid poll.</h2>
            </div>
        )
    }
};
