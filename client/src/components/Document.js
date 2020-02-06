import React, { Component } from 'react'
import axios from 'axios'


export default class Document extends Component {
    state = {
        documents: [],
        document: {
            resume: '',
            cover_letter: '',
            linkedin_link: '',
            github_link: '',
            portfolio_link: ''
        },
        addDocumentInvisable: false
    }
    componentDidMount() {
        this.reloadDocumentsPage()
    }
    reloadDocumentsPage = () => {
        axios.get('/api/v1/document/')
            .then((res) => {
                this.setState({ documents: res.data })
            })
    }
    render() {
        const allDocuments = this.state.documents.map((document) => {
            return (
                <div>
                    <div>{document.resume}</div>
                    <div>{document.cover_letter}</div>
                    <div>{document.linkedin_link}</div>
                    <div>{document.github_link}</div>
                    <div>{document.portfolio_link}</div>
                </div>
            )
        })
        return (
            <div>
                <h1>Important Documents</h1>
                {allDocuments}
            </div>
        )
    }
}
