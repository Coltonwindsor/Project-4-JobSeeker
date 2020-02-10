import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Event extends Component {
    state = {
        events: [],
        newEvent: {
            title: '',
            location: '',
            datetime: '',
            description: ''
        },
        addEventInvisable: false,
    }
    componentDidMount() {
        this.reloadEventsPage()
    }
    reloadEventsPage = () => {
        axios.get('/api/v1/event/')
            .then((res) => {
                this.setState({ events: res.data })
            })
    }
    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.newEvent[name] = value
        this.setState(copyOfState)
    }
    onSubmit = (evt) => {
        evt.preventDefault()
        axios.post('/api/v1/event/', this.state.newEvent)
            .then(() => {
                this.reloadEventsPage()
                this.toggleAddEventForm()
                const copyOfState = { ...this.state }
                copyOfState.newEvent = {
                    title: '',
                    location: '',
                    datetime: '',
                    description: ''
                }
                this.setState(copyOfState)
            })
    }
    toggleAddEventForm = () => {
        const toggle = !this.state.addEventInvisable;
        this.setState({ addEventInvisable: toggle })
    }

    render() {
        const allEvents = this.state.events.map((event) => {
            return (
                <Link to={`/event/${event.id}`}><div className='singleContainer'>{event.title}</div></Link>
            )
        })
        return (
            <div className="padding">
                <h1>Events</h1>
                {this.state.addEventInvisable === false ?
                    <div className='addEntryButtonDiv'>
                        <button
                            className="addEntryButton"
                            onClick={this.toggleAddEventForm}>
                            Add Event
                        </button>
                    </div> :
                    <div className='addEntryButtonDiv'>
                        <button
                            className="addEntryButton"
                            onClick={this.toggleAddEventForm}>
                            Back
                        </button>
                    </div>}
                {this.state.addEventInvisable === false ? <div className="list">{allEvents}</div> : null}
                {this.state.addEventInvisable === true ?
                    (<div>
                        <form onSubmit={this.onSubmit}>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='title'
                                    name='title'
                                    onChange={this.onChange}
                                    vlaue={this.state.newEvent.title}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='location'
                                    name='location'
                                    onChange={this.onChange}
                                    vlaue={this.state.newEvent.location}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='date/time'
                                    name='datetime'
                                    onChange={this.onChange}
                                    vlaue={this.state.newEvent.datetime}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='description'
                                    name='datetime'
                                    onChange={this.onChange}
                                    vlaue={this.state.newEvent.description}
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
