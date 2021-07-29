import React, { Component } from 'react';
import { Card } from 'antd';
import './test.css';
import { compile } from 'mathjs';
import { Button, FormControl, DropdownButton, Dropdown, InputGroup } from 'react-bootstrap';
import axios from 'axios';
var y, mongo;
class Backwardh extends Component {
    constructor() {
        super();
        this.state = {
            fx: '',
            x: '',
            h: '',
            degree: '',
            showOutput: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        console.log('response');
        axios.get('http://192.168.99.100:8080/mongoDB/h')
            .then(function (response) {

                console.log(response);

                mongo = response

            })

    }
    handleauto(n) {
        this.setState({
            fx: mongo.data[n - 1].fx,
            x: mongo.data[n - 1].x,
            h: mongo.data[n - 1].h,
            degree: mongo.data[n - 1].d
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    backwardh(x, h, degree) {
        switch (degree) {
            case 1:
                y = (this.fx(x) - this.fx(x - (1 * h))) / h
                break;
            case 2:
                y = (this.fx(x) - 2 * this.fx(x - (1 * h)) + this.fx(x - (2 * h))) / Math.pow(h, 2)
                break;
            case 3:
                y = (this.fx(x) - 3 * this.fx(x - (1 * h)) + 3 * this.fx(x - (2 * h)) - this.fx(x - (3 * h))) / Math.pow(h, 3)
                break;
            default:
                y = (this.fx(x) - 4 * this.fx(x - (1 * h)) + 6 * this.fx(x - (2 * h)) - 4 * this.fx(x - (3 * h)) + this.fx(x - (4 * h))) / Math.pow(h, 4)
        }
        this.setState({
            showOutput: true
        })
    }

    fx(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        console.log(expr.eval(scope));
        return expr.eval(scope);
    }
    render() {
        return (
            <div className="test">
                <Card className="test-Gh">
                <h2 className="test-h1">Backward Divided-Differences O(h)</h2>
                <div style={{ padding: "50px" }}>
                    
                        <InputGroup style={{ width: "80%", height: "30%", margin: "auto" }} >
                            <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title="F(X)"
                                id="input-group-dropdown-1"
                            >
                                <Dropdown.Item onClick={() => this.handleauto(1)}>e^x</Dropdown.Item>
                            
                            </DropdownButton>
                            <FormControl style={{ width: "80%", height: "30%", margin: "auto" }} aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="fx" placeholder=" " value={this.state.fx} onChange={this.handleChange} />
                        </InputGroup>
                        <h2>Order derivative</h2>
                        <FormControl style={{ width: "80%", height: "30%", margin: "auto" }} aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="degree" placeholder=" " value={this.state.degree} onChange={this.handleChange} />
                        <h2>X</h2>

                        <FormControl style={{ width: "80%", height: "30%", margin: "auto" }} aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="x" placeholder=" " value={this.state.x} onChange={this.handleChange} />
                        <h2>H</h2>
                        <FormControl style={{ width: "80%", height: "30%", margin: "auto" }} aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="h" placeholder=" " value={this.state.h} onChange={this.handleChange} />


                        <br /><br />

                        <Button variant="outline-dark" onClick={() => this.backwardh(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(this.state.degree))}>Submit</Button>

                    
                    {this.state.showOutput &&
                        <Card className="test-Gh">
                            <h1 className="test-h1">Output</h1>
                            <p style={{ fontSize: "24px" }}>
                                Approximate = {y}<br />
                            </p>
                        </Card>
                    }
                </div>
                </Card>
            </div>
        );
    }
}
export default Backwardh;