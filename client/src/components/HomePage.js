import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



export default class Homepage extends Component {
    state = {
        documents: [],
        events: [],
        jobs: [],
        responses: [],
        contacts: []
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
        axios.get('/api/v1/response/')
            .then((res) => {
                this.setState({ responses: res.data })
            })
        axios.get('/api/v1/contact/')
            .then((res) => {
                this.setState({ contacts: res.data })
            })
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
        const allResponses = this.state.responses.map((response) => {
            return (
                <div>{response.company}</div>
            )
        })
        const allContacts = this.state.contacts.map((contact) => {
            return (
                <div>{contact.name}</div>
            )
        })
        return (
            <div>
                <div>
                    <div>
                        I'm supposed to be showing your resume
                    {allDocuments}
                    </div>
                    <div>
                        I'm supposed to be showing your events
                    {allEvents}
                    </div>
                    <div>
                        I'm supposed to be showing your jobs
                    {allJobs}
                    </div>
                    <div>
                        I'm supposed to be showing your responses
                    {allResponses}
                    </div>
                    <div>
                        I'm supposed to be showing your contacts
                    {allContacts}
                    </div>
                </div>
            </div>
        )
    }
}
