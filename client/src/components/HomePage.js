import React, { Component } from 'react'
import axios from 'axios'



export default class Homepage extends Component {
    state = {
        documents: [],
        events: [],
        jobs: [],
        // responses: [],
        contacts: [],
        displayDocs: false,
        displayEvents: false,
        displayJobs: false,
        displayContacts: false
    }

    componentDidMount() {
        this.reloadPage()
    }
    reloadPage = () => {
        axios.get('/api/v1/document/')
            .then((res) => {
                this.setState({ documents: res.data })
            })
        axios.get('/api/v1/event/')
            .then((res) => {
                this.setState({ events: res.data })
            })
        axios.get('/api/v1/job/')
            .then((res) => {
                this.setState({ jobs: res.data })
            })
        // axios.get('/api/v1/response/')
        //     .then((res) => {
        //         this.setState({ responses: res.data })
        //     })
        axios.get('/api/v1/contact/')
            .then((res) => {
                this.setState({ contacts: res.data })
            })
    }
    toggleDocs = () => {
        const toggle = !this.state.displayDocs;
        this.setState({ displayDocs: toggle })
    }
    toggleEvents = () => {
        const toggle = !this.state.displayEvents;
        this.setState({ displayEvents: toggle })
    }
    toggleJobs = () => {
        const toggle = !this.state.displayJobs;
        this.setState({ displayJobs: toggle })
    }
    toggleContacts = () => {
        const toggle = !this.state.displayContacts;
        this.setState({ displayContacts: toggle })
    }

    render() {
        const allDocuments = this.state.documents.map((document) => {
            return (
                <div>{document.resume}</div>
            )
        })
        const allEvents = this.state.events.map((event) => {
            return (
                <div>{event.title}</div>
            )
        })
        const allJobs = this.state.jobs.map((job) => {
            return (
                <div>{job.title} - {job.company}</div>
            )
        })
        // const allResponses = this.state.responses.map((response) => {
        //     return (
        //         <div>{response.company}</div>
        //     )
        // })
        const allContacts = this.state.contacts.map((contact) => {
            return (
                <div>{contact.name}</div>
            )
        })
        return (
            <div className='homePageBackground'>
                <div className='homePagePadding'>
                    <div className='homePage'>
                        <h2> - Welcome to JobSeeker -</h2>
                        <p>This site is built to maximize your job search experience! </p>
                        <p>Upload multiple versions of resumes and cover letters.</p>
                        <p>Enhance your networking opportunities by tracking events you'd like to attend.</p>
                        <p>Manage potential jobs you'd like to apply for.</p>
                        <p>Create and edit contacts you make along the way.</p>
                    </div>
                    <div className='homeToggleButtonDiv'>
                        <button className='homeToggleButton' onClick={this.toggleDocs}>Preview Documents</button>
                        <button className='homeToggleButton' onClick={this.toggleJobs}>Preview Jobs</button>
                        <button className='homeToggleButton' onClick={this.toggleEvents}>Preview Events</button>
                        <button className='homeToggleButton' onClick={this.toggleContacts}>Preview Contacts</button>
                        {this.state.displayDocs === true ?
                            <div className='previews'>
                                - Document Versions -
                    {allDocuments}
                            </div> : null}
                        {this.state.displayEvents === true ?
                            <div className='previews'>
                                - Events -
                    {allEvents}
                            </div> : null}
                        {this.state.displayJobs === true ?
                            <div className='previews'>
                                - Jobs -
                    {allJobs}
                            </div> : null}
                        {/* <div className='previews'>
                        I'm supposed to be showing your responses
                    {allResponses}
                    </div> */}
                        {this.state.displayContacts === true ?
                            <div className='previews'>
                                - Contacts -
                    {allContacts}
                            </div> : null}
                    </div>
                </div>
            </div>
        )
    }
}
