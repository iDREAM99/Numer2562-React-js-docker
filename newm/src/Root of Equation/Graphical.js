import React, { Component } from 'react'
import { Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap'
import './Bisection.css';
import { Table, Card } from 'antd';
import { compile } from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios'
var dataSource = [], mongo;
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
        title: "Y",
        dataIndex: "y",
        key: "y"
    }

];
class Graphical extends Component {


    constructor() {
        super();
        this.state = {
            fx: '',
            Start: '',
            Final: '',
            showTable: false,

        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        console.log('response');
        axios.get('http://192.168.99.100:8080/mongoDB/Graphical')
            .then(function (response) {

                console.log(response);

                mongo = response

            })

    }
    handleauto(n) {
        this.setState({
            fx: mongo.data[n - 1].fx,
            Start: mongo.data[n - 1].Start,
            Final: mongo.data[n - 1].Final
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
    Graphical() {
        dataSource=[];
        var n = 0;
        
        for (var i = parseFloat(this.state.Start); i <= parseFloat(this.state.Final); i++) {
            
            dataSource.push({
                iteration: n,
                x: i,
                y: this.fx(i),

            })
            n++;
        }
        this.setState({

            showTable: true,

        })
    }
    render() {
        return (

            <div className="Bisection" >
                <Card className="Bisection-b">
                <h1>Graphical</h1>
                <div style={{ padding: "10% 20%" }}>

                <InputGroup className="mb-3" size="lg">
                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            title="F(X)"
                            id="input-group-dropdown-1"
                        >
                            <Dropdown.Item onClick={() => this.handleauto(1)}>x^2-5</Dropdown.Item>
                            

                        </DropdownButton>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="fx" placeholder=" " value={this.state.fx} onChange={this.handleChange} />
                    </InputGroup>
                    <br />
                    <InputGroup size="lg" >
                        <InputGroup.Prepend >
                            <InputGroup.Text id="inputGroup-sizing-lg" >Start</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="Start" value={this.state.Start} placeholder=" " onChange={this.handleChange} />
                    </InputGroup>
                    <br />
                    <InputGroup size="lg" name="xr" placeholder=" ">
                        <InputGroup.Prepend >
                            <InputGroup.Text id="inputGroup-sizing-lg">Final</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="Final" value={this.state.Final} placeholder=" " onChange={this.handleChange} />
                    </InputGroup>
                    <br />

                    <Button variant="outline-primary" onClick={() => this.Graphical()}>Submit</Button>
                    <br /><br />


                    {this.state.showTable &&
                        <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} scroll={{ y: 340 }} />

                    }
                    {this.state.showTable && <Card className="Bisection-Gh" >
                        <LineChart width={500} height={300} data={dataSource}>
                            <Line type="natural" dataKey="y" stroke="#8884d8" />
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


export default Graphical;