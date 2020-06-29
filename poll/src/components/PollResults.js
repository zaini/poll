import React from 'react';
import axios from "axios";
import ShareButtons from "./Share";
import { Doughnut } from 'react-chartjs-2';

export default class PollResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pollID: this.props.match.params.poll_id,
            poll: {},
            data: {}
        };
    }

    updateData = (results) => {
        let data = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#464646',
                    '#51A3A3',
                    '#D1D1D1',
                    '#262626',
                    '#F8F8FF',
                    '#123456',
                    '#DD7373',
                    '#FCFC62',
                    '#293F14',
                    '#DA2C38',
                    '#F2BAC9',
                    '#43291F',
                    '#BAD7F2',
                    '#BAF2E9',
                    '#B0F2B4',
                    '#31D843',
                    '#F2E2BA',
                    '#38A700'
                ]
            }]
        };

        data.datasets[0].data = results.map((result) => result[1]);
        data.labels = results.map((result) => result[0]);

        return data
    }

    componentDidMount() {
        axios.get(`http://localhost:5001/polls/${this.state.pollID}`).then(res => {
            if (res.data) {
                let poll = res.data;
                this.setState({
                    poll: poll,
                    results: Array(poll.questions.length)
                })
            }
        })
    }

    render() {
        if (this.state.poll.questions) {
            return (
                <div>
                    <h2>Poll Results</h2>
                    <br/>
                    {
                        this.state.poll.questions.map((question, qIndex) => {
                            this.state.results[qIndex] = [];
                            let questionTitle = <p key={`q${qIndex}`}>{question.question}</p>;

                            let totalVotes = 0;
                            question.options.forEach(option => {
                                totalVotes += option.votes;
                            })
                            let votes = <p>Total Votes: {totalVotes}</p>

                            let options = question.options.map((option, oIndex) => {
                                let votePercentage = option.votes === 0 ? 0 : Math.floor(100 * option.votes / totalVotes);

                                this.state.results[qIndex].push([option.value, option.votes]);

                                let optionText = <div className={'result-option'}
                                                      key={`q${qIndex}o${oIndex}`}>{option.value}
                                    <span
                                        className={'results'}>{option.votes} votes | {votePercentage}%</span>
                                </div>;
                                return [optionText]
                            })

                            let chart = <Doughnut data={this.updateData(this.state.results[qIndex])} height={75}/>;

                            return [questionTitle, options, votes, chart, <br/>]
                        })
                    }

                    <div className={'bottom-buttons'}>
                        <button onClick={() => window.location.href = window.location.href.slice(0, -2)}>vote</button>
                    </div>
                    <br/><br/>

                    <ShareButtons shareUrl={window.location.href}/>

                </div>
            )
        } else {
            return (
                <div>poll not found</div>
            )
        }
    }
};
