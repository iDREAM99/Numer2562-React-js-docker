import React, { Component } from 'react'

import { Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap'
import './Bisection.css';
import { Table, Card } from 'antd';
import { compile, derivative } from 'mathjs';
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
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        dataIndex: "Error",
        key: "Error"
    }
];
class NewtonRaphson extends Component {


    constructor() {
        super();
        this.state = {
            fx: '',
            x: '',
            showTable: false,

        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        console.log('response');
        axios.get('http://192.168.99.100:8080/mongoDB/NewtonRaphson')
            .then(function (response) {

                console.log(response);

                mongo = response

            })

    }
    handleauto(n) {
        this.setState({
            fx: mongo.data[n - 1].fx,
            x: mongo.data[n - 1].x,

        })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });

    }

    fx(X) {
        var expr = compile(this.state.fx);
        var scope = { x: parseFloat(X) };

        return expr.evaluate(scope);
        //  return X*X-7;
    }
    fxdiff(X) {
        var expr = derivative(this.state.fx, 'x');
        var scope = { x: parseFloat(X) };

        return expr.evaluate(scope);
        //  return X*2;
    }
    NewtonRaphson(x) {
        dataSource=[];
        var n = 0;
        var point ;
        var xn = 0, x0 = x;
        xn = x0 - (this.fx(x0) / this.fxdiff(x0));
        point = Math.abs((xn - x0) / xn);

        dataSource.push({
            iteration: n,
            x: xn.toFixed(6),
            Error: point.toFixed(6)
        })
        x0=xn;

        do {

            xn = x0 - (this.fx(x0) / this.fxdiff(x0));
            point = Math.abs((xn - x0) / xn);
            dataSource.push({
                iteration: n + 1,
                x: xn.toFixed(6),
                Error: point.toFixed(6)
            })
            x0 = xn;
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
                <h1>NewtonRaphson</h1>
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
                            <InputGroup.Text id="inputGroup-sizing-lg" >X</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="x" placeholder=" " value={this.state.x} onChange={this.handleChange} />
                    </InputGroup>
                    <br />

                    <br />
                    <Button variant="outline-primary" onClick={() => this.NewtonRaphson(parseFloat(this.state.x))}>Submit</Button>
                    <br /><br />
                    {this.state.showTable &&
                        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} scroll={{ y: 340 }} />
                    }
                    {this.state.showTable && <Card className="Bisection-Gh" >
                        <LineChart width={500} height={300} data={dataSource}>
                            <Line type=" " dataKey="Error" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" />
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
export default NewtonRaphson;
