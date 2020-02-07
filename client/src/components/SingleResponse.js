import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class SingleResponse extends Component {
    state = {
        response: {
            job: '',
            company: '',
            date_received: '',
            content: ''
        },
        redirect: false,
        updateFormInvisable: false
    }
    componentDidMount() {
        axios.get(`/api/v1/response/${this.props.match.params.responseId}/`)
            .then((res) => {
                console.log(res.data)
                this.setState({ response: res.data })
            })
    }
    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.response[name] = value
        this.setState(copyOfState)
    }
    onSubmit = (evt) => {
        evt.preventDefault()
        axios.put(`/api/v1/response/${this.props.match.params.responseId}/`, this.state.response)
            .then(() => {
                this.setState({ redirect: true })
            })
    }
    toggleUpdateForm = () => {
        const toggle = !this.state.updateFormInvisable
        this.setState({ updateFormInvisable: toggle })
    }
    deleteResponse = () => {
        axios.delete(`/api/v1/response/${this.props.match.params.responseId}/`)
            .then(() => {
                this.setState({ redirect: true })
            })
    }

    render() {
        return (
            <div>
                {this.state.redirect === true ? <Redirect to='/response' /> : null}
                <h1>{this.state.response.company} - {this.state.response.job}</h1>
                {this.state.updateFormInvisable === false ?
                    (<div>
                        <div>
                            {this.state.response.date_received}
                        </div>
                        <div>
                            {this.state.response.content}
                        </div>
                    </div>) : null}
                {this.state.updateFormInvisable === false ?
                    <div className="addEntryButtonDiv">
                        <button className="addEntryButton" onClick={this.toggleUpdateForm}>Edit Response</button>
                        <button className="addEntryButton" onClick={this.deleteResponse}>Delete Response</button>
                    </div> :
                    <div className="addEntryButtonDiv">
                        <button className="addEntryButton" onClick={this.toggleUpdateForm}>Back</button>
                        <button className="addEntryButton" onClick={this.deleteResponse}>Delete Response</button>
                    </div>}
                {this.state.updateFormInvisable === true ?
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="job"
                                    placeholder='job'
                                    value={this.state.response.job} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="company"
                                    placeholder='company'
                                    value={this.state.response.company} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="date_received"
                                    placeholder='date received'
                                    value={this.state.response.date_received} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="content"
                                    placeholder='content'
                                    value={this.state.response.content} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input type="submit"
                                    value="Update Response" />
                            </div>
                        </form>
                    </div> : null}
            </div>
        )
    }
}
