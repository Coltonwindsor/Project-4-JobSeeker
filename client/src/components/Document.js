import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Document extends Component {
    state = {
        documents: [],
        newDocument: {
            user: '',
            resume: '',
            cover_letter: '',
            linkedin_link: '',
            github_link: '',
            portfolio_link: ''
        },
        addDocumentInvisable: false,
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
    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.newDocument[name] = value
        this.setState(copyOfState)
    }
    onSubmit = (evt) => {
        evt.preventDefault()
        axios.post('/api/v1/document/', this.state.newDocument)
            .then(() => {
                this.reloadDocumentsPage()
                this.toggleAddDocumentForm()
                const copyOfState = { ...this.state }
                copyOfState.newDocument = {
                    user: '',
                    resume: '',
                    cover_letter: '',
                    linkedin_link: '',
                    github_link: '',
                    portfolio_link: ''
                }
                this.setState(copyOfState)
            })
    }
    toggleAddDocumentForm = () => {
        const toggle = !this.state.addDocumentInvisable;
        this.setState({ addDocumentInvisable: toggle })
    }

    render() {
        const allDocuments = this.state.documents.map((document) => {
            return (
                <Link to={`/document/${document.id}`}><div>{document.user}</div></Link>
            )
        })
        return (
            <div className="padding">
                <h1>Documents</h1>
                {this.state.addDocumentInvisable === false ?
                    <div className='addEntryButtonDiv'>
                        <button
                            className="addEntryButton"
                            onClick={this.toggleAddDocumentForm}>
                            Add Documents
                        </button>
                    </div> :
                    <div className='addEntryButtonDiv'>
                        <button
                            className="addEntryButton"
                            onClick={this.toggleAddDocumentForm}>
                            Back
                        </button>
                    </div>}
                {this.state.addDocumentInvisable === false ? <div className="documentList">{allDocuments}</div> : null}
                {this.state.addDocumentInvisable === true ?
                    (<div>
                        <form onSubmit={this.onSubmit}>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='Document version name'
                                    name='user'
                                    onChange={this.onChange}
                                    vlaue={this.state.newDocument.user}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='resume'
                                    name='resume'
                                    onChange={this.onChange}
                                    vlaue={this.state.newDocument.resume}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='cover letter'
                                    name='cover_letter'
                                    onChange={this.onChange}
                                    vlaue={this.state.newDocument.cover_letter}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='linkedIn link'
                                    name='linkedin_link'
                                    onChange={this.onChange}
                                    vlaue={this.state.newDocument.linkedin_link}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='github link'
                                    name='github_link'
                                    onChange={this.onChange}
                                    vlaue={this.state.newDocument.github_link}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='portfolio link'
                                    name='portfolio_link'
                                    onChange={this.onChange}
                                    vlaue={this.state.newDocument.portfolio_link}
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
