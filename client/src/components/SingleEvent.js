import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class SingleEvent extends Component {
    state = {
        event: {
            title: '',
            location: '',
            datetime: '',
            description: ''
        },
        redirect: false,
        updateFormInvisable: false
    }
    componentDidMount() {
        axios.get(`/api/v1/event/${this.props.match.params.eventId}/`)
            .then((res) => {
                console.log(res.data)
                this.setState({ event: res.data })
            })
    }
    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.event[name] = value
        this.setState(copyOfState)
    }
    onSubmit = (evt) => {
        evt.preventDefault()
        axios.put(`/api/v1/event/${this.props.match.params.eventId}/`, this.state.event)
            .then(() => {
                this.setState({ redirect: true })
            })
    }
    toggleUpdateForm = () => {
        const toggle = !this.state.updateFormInvisable
        this.setState({ updateFormInvisable: toggle })
    }
    deleteEvent = () => {
        axios.delete(`/api/v1/event/${this.props.match.params.eventId}/`)
            .then(() => {
                this.setState({ redirect: true })
            })
    }

    render() {
        return (
            <div>
                {this.state.redirect === true ? <Redirect to='/event' /> : null}
                <h1>{this.state.event.title}</h1>
                {this.state.updateFormInvisable === false ?
                    (<div>
                        <div>
                            {this.state.event.location}
                        </div>
                        <div>
                            {this.state.event.datetime}
                        </div>
                        <div>
                            {this.state.event.description}
                        </div>
                    </div>) : null}
                {this.state.updateFormInvisable === false ?
                    <div className="addEntryButtonDiv">
                        <button className="addEntryButton" onClick={this.toggleUpdateForm}>Edit Event</button>
                        <button className="addEntryButton" onClick={this.deleteEvent}>Delete Event</button>
                    </div> :
                    <div className="addEntryButtonDiv">
                        <button className="addEntryButton" onClick={this.toggleUpdateForm}>Back</button>
                        <button className="addEntryButton" onClick={this.deleteEvent}>Delete Event</button>
                    </div>}
                {this.state.updateFormInvisable === true ?
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="title"
                                    placeholder='title'
                                    value={this.state.event.title} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="location"
                                    placeholder='location'
                                    value={this.state.event.location} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="datetime"
                                    placeholder='date/time'
                                    value={this.state.event.datetime} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="description"
                                    placeholder='description'
                                    value={this.state.event.description} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input type="submit"
                                    value="Update Event" />
                            </div>
                        </form>
                    </div> : null}
            </div>
        )
    }
}

