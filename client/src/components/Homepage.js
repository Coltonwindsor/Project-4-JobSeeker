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
        axios.get('/api/v1/document/')
            .then((res) => {
                this.setState({ documents: res.data })
                console.log(this.state.documents)
            })
    }

    render() {
        const allDocuments = this.state.documents.map((document) => {
            return (
                <div>{document.resume}</div>
            )
        })
        return (
            <div>
                <div><Link to='/document'>documents</Link></div>
                <div><Link to='/event'>events</Link></div>
                <div><Link to='/job'>jobs</Link></div>
                <div><Link to='/response'>responses</Link></div>
                <div><Link to='/contact'>contacts</Link></div>
                <div>
                    I'm supposed to be showing your resume
                    {allDocuments}
                </div>
            </div>
        )
    }
}
