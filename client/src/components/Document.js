import React, { Component } from 'react'
import axios from 'axios'


export default class Document extends Component {
    state = {
        documents: [],
        document: {
            user: '',
            resume: '',
            cover_letter: '',
            linkedin_link: '',
            github_link: '',
            portfolio_link: ''
        },
        newDocument: {
            user: '',
            resume: '',
            cover_letter: '',
            linkedin_link: '',
            github_link: '',
            portfolio_link: ''
        },
        addDocumentInvisable: false,
        redirect: false,
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
        axios.post(`/api/v1/document/`, this.state.document)
            .then(() => {
                this.reloadDocumentsPage()
                this.toggleAddDocumentForm()
                const copyOfState = { ...this.state }
                copyOfState.document = {
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
    onUpdateSubmit = (evt) => {
        evt.preventDefault()
        axios.put(`/api/v1/document/${this.props.match.params.documentId}/`, this.state.newDocument)
            .then(() => {
                this.setState({ redirect: true })
            })
    }
    toggleAddDocumentForm = () => {
        const toggle = !this.state.addDocumentInvisable;
        this.setState({ addDocumentInvisable: toggle })
    }
    toggleUpdateForm = () => {
        const toggle = !this.state.updateFormInvisable
        this.setState({ updateFormInvisable: toggle })
    }
    deleteDocuments = () => {
        axios.delete(`/api/v1/document/${this.props.match.params.document}/`)
            .then(() => {
                this.setState({ redirect: true })
            })
    }
    render() {
        const allDocuments = this.state.documents.map((document) => {
            return (
                <div>
                    <div>{document.user}</div>
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
                {this.state.addDocumentInvisable === false ?
                    <div className='addEntryButtonDiv'>
                        <button
                            className="addEntryButton"
                            onClick={this.toggleAddDocumentForm}>
                            Add Documents
                </button>
                        <button
                            className="addEntryButton"
                            onClick={this.toggleUpdateForm}>
                            Edit Documents
                </button>
                    </div> :
                    <div className='addEntryButtonDiv'>
                        <button
                            className="addEntryButton"
                            onClick={this.toggleAddDocumentForm}>
                            Back
                </button>
                    </div>}
                {this.state.addDocumentInvisable === false ? <div>{allDocuments}</div> : null}
                {this.state.addDocumentInvisable === true ? (
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='resume'
                                    name='resume'
                                    onChange={this.onChange}
                                    value={this.state.document.resume}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='cover letter'
                                    name='cover_letter'
                                    onChange={this.onChange}
                                    value={this.state.document.cover_letter}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='linkedIn link'
                                    name='linkedin_link'
                                    onChange={this.onChange}
                                    value={this.state.document.linkedin_link}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='github link'
                                    name='github_link'
                                    onChange={this.onChange}
                                    value={this.state.document.github_link}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='portfolio link'
                                    name='portfolio_link'
                                    onChange={this.onChange}
                                    value={this.state.document.portfolio_link}
                                >
                                </input>
                            </div>
                            <div className='inputBoxDiv'>
                                <input type="submit"
                                    value="Add Documents" />
                            </div>

                        </form>
                    </div>) : null}
            </div>
        )
    }
}
