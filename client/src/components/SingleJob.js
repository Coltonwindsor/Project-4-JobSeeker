
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class SingleJob extends Component {
    state = {
        job: {
            company: '',
            title: '',
            date_posted: '',
            description: '',
            requirements: '',
            salary: '',
            applied_to: ''
        },
        redirect: false,
        updateFormInvisable: false
    }
    componentDidMount() {
        axios.get(`/api/v1/job/${this.props.match.params.jobId}/`)
            .then((res) => {
                console.log(res.data)
                this.setState({ job: res.data })
            })
    }

    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.job[name] = value
        this.setState(copyOfState)
    }
    onSubmit = (evt) => {
        evt.preventDefault()
        axios.put(`/api/v1/job/${this.props.match.params.jobId}/`, this.state.job)
            .then(() => {
                this.setState({ redirect: true })
            })
    }
    toggleUpdateForm = () => {
        const toggle = !this.state.updateFormInvisable
        this.setState({ updateFormInvisable: toggle })
    }
    deleteJob = () => {
        axios.delete(`/api/v1/job/${this.props.match.params.jobId}/`)
            .then(() => {
                this.setState({ redirect: true })
            })
    }

    render() {
        return (
            <div>
                {this.state.redirect === true ? <Redirect to='/job' /> : null}
                <h1>{this.state.job.company} - {this.state.job.title}</h1>
                {this.state.updateFormInvisable === false ?
                    (<div>
                        <div>
                            {this.state.job.date_posted}
                        </div>
                        <div>
                            {this.state.job.description}
                        </div>
                        <div>
                            {this.state.job.requirements}
                        </div>
                        <div>
                            {this.state.job.salary}
                        </div>
                        <div>
                            {this.state.job.applied_to}
                        </div>
                    </div>) : null}
                {this.state.updateFormInvisable === false ?
                    <div className="addEntryButtonDiv">
                        <button className="addEntryButton" onClick={this.toggleUpdateForm}>Edit Job</button>
                        <button className="addEntryButton" onClick={this.deleteJob}>Delete Job</button>
                    </div> :
                    <div className="addEntryButtonDiv">
                        <button className="addEntryButton" onClick={this.toggleUpdateForm}>Back</button>
                        <button className="addEntryButton" onClick={this.deleteJob}>Delete Job</button>
                    </div>}
                {this.state.updateFormInvisable === true ?
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="company"
                                    placeholder='company'
                                    value={this.state.job.company} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="title"
                                    placeholder='title'
                                    value={this.state.job.title} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="date_posted"
                                    placeholder='date posted'
                                    value={this.state.job.date_posted} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="description"
                                    placeholder='description'
                                    value={this.state.job.description} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="text"
                                    name="requirements"
                                    placeholder='requirements'
                                    value={this.state.job.requirements} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="number"
                                    name="salary"
                                    placeholder='salary'
                                    value={this.state.job.salary} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="checkbox"
                                    name="applied_to"
                                    placeholder='applied to'
                                    value={this.state.job.applied_to} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input type="submit"
                                    value="Update Job" />
                            </div>
                        </form>
                    </div> : null}
            </div>
        )
    }
}
