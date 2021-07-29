import React, { Component } from 'react'

import { Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap'
import './Bisection.css';
import { Table, Card } from 'antd';
import { compile } from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';
var dataSource = [
], mongo;
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X0",
        dataIndex: "x0",
        key: "x0"
    },
    {
        title: "X1",
        dataIndex: "x1",
        key: "x1"
    },
    {
        title: "Error",
        dataIndex: "Error",
        key: "Error"
    }
];
class Secant extends Component {


    constructor() {
        super();
        this.state = {
            fx: '',
            x0: '',
            x1: '',
            showTable: false,

        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        console.log('response');
        axios.get('http://192.168.99.100:8080/mongoDB/Secant')
            .then(function (response) {

                console.log(response);

                mongo = response

            })

    }
    handleauto(n) {
        this.setState({
            fx: mongo.data[n - 1].fx,
            x0: mongo.data[n - 1].x0,
            x1: mongo.data[n - 1].x1

        })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });

    }

    fx(X) {
        var expr = compile(this.state.fx);
        var scope = { x: parseFloat(X) };
        //console.log(expr);
        return expr.evaluate(scope);
        //return (Math.pow(Math.E, -X / 4) * (2 - X)) - 1
    }
    Secant(x1, x2) {
        dataSource = [];
        var n = 0
        var point = 1
        var x0 = x2 - (((this.fx(x2)) * (x1 - x2)) / (this.fx(x1) - this.fx(x2)));

        // console.log
        //console.log(x0);


        dataSource.push({
            iteration: n,
            x0: x1.toFixed(6),
            x1: x2.toFixed(6),
            Error: point.toFixed(6)
        })
        x1 = x2;
        x2 = x0;

        do {
            x0 = x2 - (((this.fx(x2)) * (x1 - x2)) / (this.fx(x1) - this.fx(x2)));
            point = Math.abs((x0 - x2) / x0);

            dataSource.push({
                iteration: n + 1,
                x0: x1.toFixed(6),
                x1: x2.toFixed(6),
                Error: point.toFixed(6)
            })
            x1 = x2;
            x2 = x0;
            n++;
        } while (point.toFixed(6) > 0.000001)

        this.setState({

            showTable: true,

        })

    }
    render() {
        return (

            <div className="Bisection" >
                <Card className="Bisection-b">
                    <h1>Secant</h1>

                    <div style={{ padding: "10% 20%" }}>

                        <InputGroup className="mb-3" size="lg">
                            <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title="F(X)"
                                id="input-group-dropdown-1"
                            >
                                <Dropdown.Item onClick={() => this.handleauto(1)}>e^(-x/4)(2-x)-1</Dropdown.Item>
                            </DropdownButton>
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="fx" placeholder=" " value={this.state.fx} onChange={this.handleChange} />
                        </InputGroup>
                        <br />
                        <InputGroup size="lg" >
                            <InputGroup.Prepend >
                                <InputGroup.Text id="inputGroup-sizing-lg" >X0</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="x0" value={this.state.x0} placeholder=" " onChange={this.handleChange} />
                        </InputGroup>
                        <br />
                        <InputGroup size="lg" >
                            <InputGroup.Prepend >
                                <InputGroup.Text id="inputGroup-sizing-lg">X1</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="x1" value={this.state.x1} placeholder=" " onChange={this.handleChange} />
                        </InputGroup>
                        <br />

                        <Button variant="outline-primary" onClick={() => this.Secant(parseFloat(this.state.x0), parseFloat(this.state.x1))}>Submit</Button>
                        <br /><br />


                        {this.state.showTable &&
                            <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} scroll={{ y: 340 }} />

                        }
                        {this.state.showTable && <Card className="Bisection-Gh" >
                            <LineChart width={500} height={350} data={dataSource}>
                                <Line type="natural" dataKey="Error" stroke="#8884d8" />
                                <Line type="natural" dataKey="x0" stroke="#CA584C" />
                                <Line type="natural" dataKey="x1" stroke="#7F9F4A" />
                                <CartesianGrid stroke=" " />
                                <XAxis dataKey="iteration" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </Card>}
                    </div>

                </Card>

            </div>
        )
    }
}
export default Secant;
