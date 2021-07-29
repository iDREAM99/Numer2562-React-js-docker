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
        title: "Sum",
        dataIndex: "Sum",
        key: "Sum"
    },
    {
        title: "Error",
        dataIndex: "Error",
        key: "Error"
    }
];
class Taylor extends Component {


    constructor() {
        super();
        this.state = {
            fx: '',
            x: '',
            x0: '',
            N: '',
            error: 0,
            showTable: false,

        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        console.log('response');
        axios.get('http://192.168.99.100:8080/mongoDB/Taylor')
            .then(function (response) {

                console.log(response);

                mongo = response

            })

    }
    handleauto(n) {
        this.setState({
            fx: mongo.data[n - 1].fx,
            x: mongo.data[n - 1].x,
            x0: mongo.data[n - 1].x0,
            N: mongo.data[n - 1].n

        })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });

    }

    fx(X) {
        var expr = compile(this.state.fx);
        var scope = { x: parseFloat(X) };

        return expr.evaluate(scope);
        //return Math.log(4);
    }
    fxdiff() {
        dataSource=[];
        var expr = this.state.fx;
        var sum = this.state.x - this.state.x0;
        var s = 0;
        var su = this.fx(this.state.x0);
        var nn = 1;
        var xn = this.fx(this.state.x), point = 0;
        dataSource.push({
            iteration: 0,
            Sum: su.toFixed(6),
            Error: 1
        })
        for (var i = 1; i < this.state.N; i++) {
            // console.log(i)
            expr = derivative(expr, 'x');
            var scope = { x: parseFloat(this.state.x0) };
            s = expr.evaluate(scope);
            //console.log(s+" "+i);
            nn = nn * i;
            //console.log(nn);
            su += ((Math.pow(sum, i) * s) / nn);
            point = Math.abs((xn - su) / xn);
            // console.log(point);
            dataSource.push({
                iteration: i,
                Sum: su.toFixed(6),
                Error: point.toFixed(6)
            })
            //  console.log(su+" "+i+" ");

        }
        // console.log(X)


        return su;
        //  return X*2;
    }


    Taylor(x) {
        //console.log();

        this.fxdiff();
        this.setState({
            showTable: true,
        })

    }
    render() {
        return (
            <div className="Bisection" >
                <Card className="Bisection-b">
                <h1>Taylor</h1>
                <div style={{ padding: "10% 20%" }}>

                    <InputGroup className="mb-3" size="lg">
                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            title="F(X)"
                            id="input-group-dropdown-1"
                        >
                            <Dropdown.Item onClick={() => this.handleauto(1)}>log(x)</Dropdown.Item>
                        </DropdownButton>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="fx" placeholder=" " value={this.state.fx} onChange={this.handleChange} />
                    </InputGroup>
                    <br />
                    <InputGroup size="lg" >
                        <InputGroup.Prepend >
                            <InputGroup.Text id="inputGroup-sizing-lg" >X</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="x" value={this.state.x} placeholder=" " onChange={this.handleChange} />
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
                            <InputGroup.Text id="inputGroup-sizing-lg" >N</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="N" value={this.state.N} placeholder=" " onChange={this.handleChange} />
                    </InputGroup>
                    <br />

                    <br />
                    <Button variant="outline-primary" onClick={() => this.Taylor(parseFloat(this.state.x))}>Submit</Button>
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
export default Taylor;
