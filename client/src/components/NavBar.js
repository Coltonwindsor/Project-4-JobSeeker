import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <div className='header-fix'>
                <div className='header'>
                    <p>This is where the logo image will go</p>
                </div>
                <div className='navContainer'>
                    <Link to='/' className='nav'><div>Home</div></Link>
                    <Link to='/document' className='nav'><div>Documents</div></Link>
                    <Link to='/event' className='nav'><div>Events</div></Link>
                    <Link to='/job' className='nav'><div>Jobs</div></Link>
                    {/* <Link to='/response'><div>Responses</div></Link> */}
                    <Link to='/contact' className='nav'><div>Contacts</div></Link>
                </div>
            </div>
        )
    }
}
