import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Job extends Component {
    state = {
        jobs: [],
        newJob: {
            company: '',
            title: '',
            date_posted: '',
            description: '',
            requirements: '',
            salary: '',
        },
        addJobInvisable: false,
    }
    componentDidMount() {
        this.reloadJobsPage()
    }
    reloadJobsPage = () => {
        axios.get('/api/v1/job/')
            .then((res) => {
                this.setState({ jobs: res.data })
            })
    }
    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.newJob[name] = value
        this.setState(copyOfState)
    }
    onSubmit = (evt) => {
        evt.preventDefault()
        axios.post('/api/v1/job/', this.state.newJob)
            .then(() => {
                this.reloadJobsPage()
                this.toggleAddJobForm()
                const copyOfState = { ...this.state }
                copyOfState.newJob = {
                    company: '',
                    title: '',
                    date_posted: '',
                    description: '',
                    requirements: '',
                    salary: '',
                }
                this.setState(copyOfState)
            })
    }
    toggleAddJobForm = () => {
        const toggle = !this.state.addJobInvisable;
        this.setState({ addJobInvisable: toggle })
    }

    render() {
        const allJobs = this.state.jobs.map((job) => {
            return (
                <Link to={`/job/${job.id}`}><div>{job.company} - {job.title}</div></Link>
            )
        })
        return (
            <div className="padding">
                <h1>Jobs</h1>
                {this.state.addJobInvisable === false ?
                    <div className='addEntryButtonDiv'>
                        <button
                            className="addEntryButton"
                            onClick={this.toggleAddJobForm}>
                            Add Job
                        </button>
                    </div> :
                    <div className='addEntryButtonDiv'>
                        <button
                            className="addEntryButton"
                            onClick={this.toggleAddJobForm}>
                            Back
                        </button>
                    </div>}
                {this.state.addJobInvisable === false ? <div className="jobList">{allJobs}</div> : null}
                {this.state.addJobInvisable === true ?
                    (<div>
                        <form onSubmit={this.onSubmit}>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='company'
                                    name='company'
                                    onChange={this.onChange}
                                    vlaue={this.state.newJob.company}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='title'
                                    name='title'
                                    onChange={this.onChange}
                                    vlaue={this.state.newJob.title}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='date posted'
                                    name='date_posted'
                                    onChange={this.onChange}
                                    vlaue={this.state.newJob.date_posted}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='description'
                                    name='description'
                                    onChange={this.onChange}
                                    vlaue={this.state.newJob.description}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='text'
                                    placeholder='requirements'
                                    name='requirements'
                                    onChange={this.onChange}
                                    vlaue={this.state.newJob.requirements}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
                                <input
                                    type='number'
                                    placeholder='salary'
                                    name='salary'
                                    onChange={this.onChange}
                                    vlaue={this.state.newJob.salary}
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

