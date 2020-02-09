import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class SingleDocument extends Component {
    state = {
        document: {
            user: '',
            resume: '',
            cover_letter: '',
            linkedin_link: '',
            github_link: '',
            portfolio_link: ''
        },
        redirect: false,
        updateFormInvisable: false
    }
    componentDidMount() {
        axios.get(`/api/v1/document/${this.props.match.params.documentId}/`)
            .then((res) => {
                console.log(res.data)
                this.setState({ document: res.data })
            })
    }
    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.document[name] = value
        this.setState(copyOfState)
    }
    onSubmit = (evt) => {
        evt.preventDefault()
        axios.put(`/api/v1/document/${this.props.match.params.documentId}/`, this.state.document)
            .then(() => {
                this.setState({ redirect: true })
            })
    }
    toggleUpdateForm = () => {
        const toggle = !this.state.updateFormInvisable
        this.setState({ updateFormInvisable: toggle })
    }
    deleteDocument = () => {
        axios.delete(`/api/v1/document/${this.props.match.params.documentId}/`)
            .then(() => {
                this.setState({ redirect: true })
            })
    }

    render() {
        return (
            <div className="padding">
                {this.state.redirect === true ? <Redirect to='/document' /> : null}
                <h1>{this.state.document.user}</h1>
                {this.state.updateFormInvisable === false ?
                    (<div>
                        <div>
                            {this.state.document.resume}
                        </div>
                        <div>
                            {this.state.document.cover_letter}
                        </div>
                        <div>
                            {this.state.document.linkedin_link}
                        </div>
                        <div>
                            {this.state.document.github_link}
                        </div>
                        <div>
                            {this.state.document.portfolio_link}
                        </div>
                    </div>) : null}
                {this.state.updateFormInvisable === false ?
                    <div className="addEntryButtonDiv">
                        <button className="addEntryButton" onClick={this.toggleUpdateForm}>Edit Document</button>
                        <button className="addEntryButton" onClick={this.deleteDocument}>Delete Document</button>
                    </div> :
                    <div className="addEntryButtonDiv">
                        <button className="addEntryButton" onClick={this.toggleUpdateForm}>Back</button>
                        <button className="addEntryButton" onClick={this.deleteDocument}>Delete Document</button>
                    </div>}
                {this.state.updateFormInvisable === true ?
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="user"
                                    placeholder='Documents version name'
                                    value={this.state.document.user} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="resume"
                                    placeholder='resume'
                                    value={this.state.document.resume} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="cover_letter"
                                    placeholder='cover letter'
                                    value={this.state.document.cover_letter} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="linkedin_link"
                                    placeholder='linkedIn link'
                                    value={this.state.document.linkedin_link} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="github_link"
                                    placeholder='github link'
                                    value={this.state.document.github_link} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="portfolio_link"
                                    placeholder='portfolio link'
                                    value={this.state.document.portfolio_link} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input type="submit"
                                    value="Update Document" />
                            </div>
                        </form>
                    </div> : null}
            </div>
        )
    }
}
