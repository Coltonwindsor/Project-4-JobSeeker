import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to='/'><div>Home</div></Link>
                    <Link to='/document'><div>Documents</div></Link>
                    <Link to='/event'><div>Events</div></Link>
                    <Link to='/job'><div>Jobs</div></Link>
                    {/* <Link to='/response'><div>Responses</div></Link> */}
                    <Link to='/contact'><div>Contacts</div></Link>
                </div>
            </div>
        )
    }
}
