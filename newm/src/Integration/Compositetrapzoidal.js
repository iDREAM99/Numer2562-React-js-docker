import React, { Component } from 'react'
import { Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap'
import './in.css';
import {  Card } from 'antd';
import { compile } from 'mathjs';
import axios from 'axios'
const Algebrite = require('algebrite')
var mongo;

var I, Integrate, error;
class Compositetrapzoidal extends Component {

    constructor() {
        super();
        this.state = {
            fx: '',
            a: '',
            b: '',
            n:'',
            showOutput: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log('response');
        axios.get('http://192.168.99.100:8080/mongoDB/in')
            .then(function (response) {
                console.log(response);
                mongo = response
            })
    }
    handleauto(n) {
        this.setState({
            fx: mongo.data[n - 1].fx,
            a: mongo.data[n - 1].a,
            b: mongo.data[n - 1].b,
            n: mongo.data[n-1].n
        })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    fx(X) {
        var expr = compile(this.state.fx);
        var scope = { x: parseFloat(X) };
        return expr.evaluate(scope);
    }

    Integrate(a, b) {
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({x:b}) - expr.eval({x:a})

    }

    sum(n, h) {
        var sum = 0
        var middle = h
        for (var i=1 ; i<n ; i++) {
            sum += this.fx(middle)
            middle += h
        }
        return sum;
    }

    ct(a, b, n) {
        var h = (b-a)/n
        I = ((h / 2) * (this.fx(a) + this.fx(b) + 2*this.sum(n, h))).toFixed(6);
        Integrate = this.Integrate(a, b).toFixed(6);
        error = (Math.abs((Integrate-I) / Integrate) * 100).toFixed(6);
        this.setState({
            showOutput: true
        })
    }

    render() {
        return (

            <div className="in" >
                <Card className="in-b">
                    <h1>Compositetrapzoidal</h1>
                    <br/>
                    <div style={{ padding: "10% 20%" }} id="Graph">

                        <InputGroup className="mb-3" size="lg">
                            <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title="F(X)"
                                id="input-group-dropdown-1"
                            >
                                <Dropdown.Item onClick={() => this.handleauto(1)}>4x^5-3x^4-x^3-6x+2</Dropdown.Item>

                            </DropdownButton>
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="fx" placeholder=" " value={this.state.fx} onChange={this.handleChange} />
                        </InputGroup>
                        <br />
                        <InputGroup size="lg" >
                            <InputGroup.Prepend >
                                <InputGroup.Text id="inputGroup-sizing-lg" >a</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="a" placeholder=" " value={this.state.a} onChange={this.handleChange} />
                        </InputGroup>
                        <br />
                        <InputGroup size="lg" >
                            <InputGroup.Prepend >
                                <InputGroup.Text id="inputGroup-sizing-lg">b</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="b" placeholder=" " value={this.state.b} onChange={this.handleChange} />
                        </InputGroup>
                        <br />
                        <InputGroup size="lg" >
                            <InputGroup.Prepend >
                                <InputGroup.Text id="inputGroup-sizing-lg">N</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="n" placeholder=" " value={this.state.n} onChange={this.handleChange} />
                        </InputGroup>
                        <br />
                        <Button variant="outline-primary" onClick={() => this.ct(parseInt(this.state.a), parseInt(this.state.b), parseInt(this.state.n))}>Submit</Button>
                        <br /><br />

                        {this.state.showOutput && 
                        <Card>
                            <p style={{ fontSize: "24px" }}>
                            Approximate = {I}<br/>
                            Integrate = {Integrate}<br/>
                                Error = {error}%
                            </p>
                                
                           
                        </Card>
                    } 
                        



                    </div>
                </Card>

            </div>
        )
    }
}
export default Compositetrapzoidal;
