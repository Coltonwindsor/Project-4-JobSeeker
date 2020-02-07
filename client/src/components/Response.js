import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Response extends Component {
    state = {
        responses: [],
        newResponse: {
            job: '',
            company: '',
            date_received: '',
            content: ''
        },
        addResponseInvisable: false,
    }
    componentDidMount() {
        this.reloadResponsesPage()
    }
    reloadResponsesPage = () => {
        axios.get('/api/v1/response/')
            .then((res) => {
                this.setState({ responses: res.data })
            })
    }
    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.newResponse[name] = value
        this.setState(copyOfState)
    }
    onSubmit = (evt) => {
        evt.preventDefault()
        axios.post('/api/v1/response/', this.state.newResponse)
            .then(() => {
                this.reloadResponsesPage()
                this.toggleAddResponseForm()
                const copyOfState = { ...this.state }
                copyOfState.newResponse = {
                    job: '',
                    company: '',
                    date_received: '',
                    content: ''
                }
                this.setState(copyOfState)
            })
    }
    toggleAddResponseForm = () => {
        const toggle = !this.state.addResponseInvisable;
        this.setState({ addResponseInvisable: toggle })
    }

    render() {
        const allResponses = this.state.responses.map((response) => {
            return (
                <Link to={`/response/${response.id}`}><div>{response.company} - {response.job}</div></Link>
            )
        })
        return (
            <div>
                <h1>Responses</h1>
                {this.state.addResponseInvisable === false ?
                    <div className='addEntryButtonDiv'>
                        <button
                            className="addEntryButton"
                            onClick={this.toggleAddResponseForm}>
                            Add Response
                        </button>
                    </div> :
                    <div className='addEntryButtonDiv'>
                        <button
                            className="addEntryButton"
                            onClick={this.toggleAddResponseForm}>
                            Back
                        </button>
                    </div>}
                {this.state.addResponseInvisable === false ? <div className="responseList">{allResponses}</div> : null}
                {this.state.addResponseInvisable === true ?
                    (<div>
                        <form onSubmit={this.onSubmit}>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='job'
                                    name='job'
                                    onChange={this.onChange}
                                    vlaue={this.state.newResponse.job}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='company'
                                    name='company'
                                    onChange={this.onChange}
                                    vlaue={this.state.newResponse.company}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='date received'
                                    name='date_received'
                                    onChange={this.onChange}
                                    vlaue={this.state.newResponse.date_received}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='content'
                                    name='content'
                                    onChange={this.onChange}
                                    vlaue={this.state.newResponse.content}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input type="submit" vlaue="Create"></input>
                            </div>
                        </form>
                    </div>) : null}
            </div>
        )
    }
}
