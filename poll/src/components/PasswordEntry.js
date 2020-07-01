import React from 'react';

export default class PasswordEntry extends React.Component {
    render() {
        return (
            <div className={'password-entry'}>
                <h2>This poll requires a password.</h2>
                <input type='password' placeholder="password" value={this.props.passwordValue}
                       onChange={(e) => this.props.changeEnteredPassword(e.target.value)}
                       onKeyPress={e => {
                           if (e.key === 'Enter') {
                               this.props.submitPassword()
                           }
                       }}/>
                <button onClick={() => this.props.submitPassword()}>submit</button>
            </div>
        )
    }
};
