import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar'
export default class H extends Component {
    render() {
        return (
            <div className="App">

                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">
                        <img src={logo} className="App-logo" alt="" />
                         NUMERICAL
                    </Navbar.Brand>
                </Navbar>
                


            </div>
        )
    }
}

