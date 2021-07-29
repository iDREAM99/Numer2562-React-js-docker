import React, { Component } from 'react'

import { Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap'
import './Bisection.css';
import { Table, Card } from 'antd';
import { compile } from 'mathjs';
import axios from 'axios'
window.d3 = require('d3');
const functionPlot = require("function-plot");
var dataSource = [];
var mongo;
var ans;
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "XL",
        dataIndex: "l",
        key: "l"
    },
    {
        title: "XR",
        dataIndex: "r",
        key: "r"
    },
    {
        title: "XM",
        dataIndex: "m",
        key: "m"
    },
    {
        title: "Error",
        dataIndex: "Error",
        key: "Error"
    }
];

class Bisection extends Component {


    constructor() {
        super();
        this.state = {
            fx: '',
            xl: '',
            xr: '',
            showTable: false,
            Equation: false

        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        console.log('response');
        axios.get('http://192.168.99.100:8080/mongoDB/bisection')
            .then(function (response) {
                console.log(response);
                mongo = response
            })
    }
    handleauto(n) {
        this.setState({
            fx: mongo.data[n - 1].fx,
            xl: mongo.data[n - 1].xl,
            xr: mongo.data[n - 1].xr
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
    bisection(xl, xr) {
        dataSource = [];
        var n = 0;
        var point, xmn;
        var xm = (xl + xr) / 2
        if (this.fx(xm) * this.fx(xr) > 0) {
            xr = xm
        }
        else {
            xl = xm
        }
        point = Math.abs((xmn - xm) / xmn);

        dataSource.push({
            iteration: n,
            l: xl.toFixed(6),
            r: xr.toFixed(6),
            m: xm.toFixed(6),
            Error: point.toFixed(6)
        })

        do {

            xmn = (xl + xr) / 2
            if (this.fx(xmn) * this.fx(xr) > 0) {
                xr = xmn
            }
            else {
                xl = xmn
            }
            point = Math.abs((xmn - xm) / xmn);
            xm = xmn
            dataSource.push({
                iteration: n + 1,
                l: xl.toFixed(6),
                r: xr.toFixed(6),
                m: xm.toFixed(6),
                Error: point.toFixed(6)
            })
            ans = xm;
            n++;
        } while (point.toFixed(6) > 0.000001)

        this.setState({

            showTable: true,

        })

    }
    ShowG() {
        functionPlot({
            target: '#Graph',
            width: 600,
            height: 400,
            padding: "auto",
            tip: {
                renderer: function () { }
            },
            grid: true,
            data: [
                {
                    fn: this.state.fx, color: 'red'

                }
            ],
            annotations: [{
                x: ans,
                color: 'black',
                text: 'answer = ' + ans.toFixed(6)
            }]
        });

    }

    render() {
        return (

            <div className="Bisection" >
                <Card className="Bisection-b">
                    <h1>Bisection</h1>
                    <br/>
                    <div style={{ padding: "10% 20%" }} id="Graph">

                        <InputGroup className="mb-3" size="lg">
                            <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title="F(X)"
                                id="input-group-dropdown-1"
                            >
                                <Dropdown.Item onClick={() => this.handleauto(1)}>x^4-13</Dropdown.Item>

                            </DropdownButton>
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="fx" placeholder=" " value={this.state.fx} onChange={this.handleChange} />
                        </InputGroup>
                        <br />
                        <InputGroup size="lg" >
                            <InputGroup.Prepend >
                                <InputGroup.Text id="inputGroup-sizing-lg" >XL</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="xl" placeholder=" " value={this.state.xl} onChange={this.handleChange} />
                        </InputGroup>
                        <br />
                        <InputGroup size="lg" name="xr" placeholder=" ">
                            <InputGroup.Prepend >
                                <InputGroup.Text id="inputGroup-sizing-lg">XR</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="xr" placeholder=" " value={this.state.xr} onChange={this.handleChange} />
                        </InputGroup>
                        <br />
                        <Button variant="outline-primary" onClick={() => this.bisection(parseFloat(this.state.xl), parseFloat(this.state.xr))}>Submit</Button>
                        <br /><br />
                        {this.state.showTable &&
                            <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} scroll={{ y: 340 }} />
                        }
                        <br />
                        {this.state.showTable && <div>
                            {this.ShowG()}</div>
                        }
                    </div>
                </Card>

            </div>
        )
    }
}
export default Bisection;
