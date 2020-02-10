import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class SingleContact extends Component {
    state = {
        contact: {
            name: '',
            company: '',
            email: '',
            phone_number: ''
        },
        redirect: false,
        updateFormInvisable: false
    }
    componentDidMount() {
        axios.get(`/api/v1/contact/${this.props.match.params.contactId}/`)
            .then((res) => {
                console.log(res.data)
                this.setState({ contact: res.data })
            })
    }
    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.contact[name] = value
        this.setState(copyOfState)
    }
    onSubmit = (evt) => {
        evt.preventDefault()
        axios.put(`/api/v1/contact/${this.props.match.params.contactId}/`, this.state.contact)
            .then(() => {
                this.setState({ redirect: true })
            })
    }
    toggleUpdateForm = () => {
        const toggle = !this.state.updateFormInvisable
        this.setState({ updateFormInvisable: toggle })
    }
    deleteContact = () => {
        axios.delete(`/api/v1/contact/${this.props.match.params.contactId}/`)
            .then(() => {
                this.setState({ redirect: true })
            })
    }

    render() {
        return (
            <div className="padding">
                {this.state.redirect === true ? <Redirect to='/contact' /> : null}
                <h1>{this.state.contact.name}</h1>
                {this.state.updateFormInvisable === false ?
                    (<div className='entryText'>
                        <div>
                            {this.state.contact.company}
                        </div>
                        <div>
                            {this.state.contact.email}
                        </div>
                        <div>
                            {this.state.contact.phone_number}
                        </div>
                    </div>) : null}
                {this.state.updateFormInvisable === false ?
                    <div className="addEntryButtonDiv">
                        <button className="addEntryButton" onClick={this.toggleUpdateForm}>Edit Contact</button>
                        <button className="addEntryButton" onClick={this.deleteContact}>Delete Contact</button>
                    </div> :
                    <div className="addEntryButtonDiv">
                        <button className="addEntryButton" onClick={this.toggleUpdateForm}>Back</button>
                        <button className="addEntryButton" onClick={this.deleteContact}>Delete Contact</button>
                    </div>}
                {this.state.updateFormInvisable === true ?
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="name"
                                    placeholder='name'
                                    value={this.state.contact.name} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="company"
                                    placeholder='company'
                                    value={this.state.contact.company} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="email"
                                    placeholder='email'
                                    value={this.state.contact.email} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="phone_number"
                                    placeholder='phone number'
                                    value={this.state.contact.phone_number} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input type="submit"
                                    value="Update Contact" />
                            </div>
                        </form>
                    </div> : null}
            </div>
        )
    }
}
