import React, { Component } from 'react'
import { Card, Input, Table } from 'antd';
import './La.css';
import 'antd/dist/antd.css';
import { Button, FormControl, DropdownButton, Dropdown } from 'react-bootstrap'
import { lusolve } from 'mathjs';
import axios from 'axios'
var mongo = '', as, xs, bs;

var dataSource = [
];

var A = [], B = [], matrixA = [], matrixB = [], x = [], qw = [];
const columns = [
    {
        title: "X",
        dataIndex: "X",
        key: "X"
    },
    {
        title: "Sum",
        dataIndex: "Sum",
        key: "Sum"
    }
];
class Cholesky extends Component {

    constructor() {
        super();
        this.state = {
            row: '',
            column: '',
            showDimentionForm: true,
            showDimentionButton: true,
            showMatrixForm: false,
            showMatrixButton: false,
            showOutputCard: false,
            chaekdata: false
        }
        this.handleChange = this.handleChange.bind(this);
        //this.cramer = this.cramer.bind(this);

    }
    componentDidMount() {

        console.log('response');
        axios.get('http://192.168.99.100:8080/mongoDB/Linear')
            .then(function (response) {
                mongo = response
            })
    }
    Cholesky() {
        dataSource = [];
        this.PutMatrix();
        var decompose = lusolve(A, B)
        console.log(decompose);
        for (var i = 0; i < decompose.length; i++) {

            dataSource.push({
                X: qw[i],
                Sum: parseFloat(decompose[i]).toFixed(6)
            })
        }
        this.setState({
            showTable: true,
            showOutputCard: true
        });
    }
    chaek() {
        if (this.state.chaekdata === false) {
            console.log('true');
            this.Input();
        } else {

            this.Inputtrue();
        }

    }
    handleauto(n) {
        as = JSON.parse(JSON.stringify(mongo.data[n - 1].a));
        xs = JSON.parse(JSON.stringify(mongo.data[n - 1].x));
        bs = JSON.parse(JSON.stringify(mongo.data[n - 1].b));
        this.setState({
            row: mongo.data[n - 1].row,
            column: mongo.data[n - 1].column,
            chaekdata: true
        })
    }
    Input() {
        matrixA = [];
        matrixB = [];
        x = [];
        var j;
        for (var i = 1; i <= this.state.row; i++) {
            for (j = 1; j <= this.state.column; j++) {
                matrixA.push(
                    <Input style={{
                        width: "8%",
                        height: "30%",
                        marginInlineEnd: "2%", marginBlockEnd: "3%",
                    }} id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={i + "-" + j} />
                )
            }
            matrixA.push(<br />)
           

            matrixB.push(
                <Input style={{
                    width: "8%",
                    height: "30%",
                    marginInlineEnd: "2%", marginBlockEnd: "3%",
                }} id={"b" + i} placeholder={i} />
            )
        }
        for(let i=1;i<=this.state.column;i++){
            x.push(
                <Input style={{
                    width: "8%",
                    height: "30%",
                    marginInlineEnd: "2%", marginBlockEnd: "3%",
                }} id={"x" + i} key={"x" + i}  placeholder={i} />
            )
        }
        this.setState({
            showDimentionForm: false,
            showDimentionButton: false,
            showMatrixForm: true,
            showMatrixButton: true

        })


    }
    Inputtrue() {
        matrixA = [];
        matrixB = [];
        x = [];
        for (var i = 1; i <= this.state.row; i++) {
            for (var j = 1; j <= this.state.column; j++) {
                matrixA.push(
                    <Input style={{
                        width: "8%",
                        height: "30%",
                        marginInlineEnd: "2%", marginBlockEnd: "3%",
                    }} id={"a" + i + "" + j} key={"a" + i + "" + j} value={as[i - 1][j - 1]} placeholder={i + "-" + j} />
                )
            }
            matrixA.push(<br />)

           
            matrixB.push(
                <Input style={{
                    width: "8%",
                    height: "30%",
                    marginInlineEnd: "2%", marginBlockEnd: "3%",
                }} id={"b" + i} value={bs[i - 1]} placeholder={i} />
            )

        }
        for(let i=1;i<=this.state.column;i++){
            x.push(
                <Input style={{
                    width: "8%",
                    height: "30%",
                    marginInlineEnd: "2%", marginBlockEnd: "3%",
                }} id={"x" + i} key={"x" + i} value={xs[i - 1]} placeholder={i} />
            )
        }

        this.setState({
            showDimentionForm: false,
            showDimentionButton: false,
            showMatrixForm: true,

            showMatrixButton: true

        })
    }
    PutMatrix() {
        A = [];
        B = [];
        qw = [];
        for (var i = 0; i < this.state.row; i++) {
            A[i] = []
            for (var j = 0; j < this.state.column; j++) {
                A[i][j] = (JSON.parse(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            }
            B.push(JSON.parse(document.getElementById("b" + (i + 1)).value));
            qw.push(document.getElementById("x" + (i + 1)).value);

        }

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div className="La">
                <Card className="La-b" >
                    <h2 className="La-h1"> Cholesky</h2>
                    <div style={{ padding: "50px 50px 60px" }}>

                        {this.state.showMatrixForm &&
                            <div>
                                <h2>Matrix [A]</h2>
                                <br />
                                {matrixA}
                                <h2>Vector [x]<br /></h2>
                                {x}
                                <h2>Vector [B]<br /></h2>
                                {matrixB}
                            </div>}

                        {this.state.showDimentionForm &&
                            <div>
                                <h2>Row</h2> <br /><FormControl style={{ width: "80%", height: "30%", margin: "auto" }} name="row" value={this.state.row} placeholder=" " onChange={this.handleChange} /><br />
                                <h2>Column</h2> <br /><FormControl style={{ width: "80%", height: "30%", margin: "auto" }} name="column" value={this.state.column} placeholder=" " onChange={this.handleChange} />
                            </div>
                        }
                        <br/>
                        {this.state.showDimentionButton && <DropdownButton

                            variant="outline-secondary"
                            title="nxn"
                            id="input-group-dropdown-1"
                        >
                            <Dropdown.Item onClick={() => this.handleauto(1)}>3x3</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleauto(2)}>4x4</Dropdown.Item>
                        </DropdownButton>}<br/>
                        {this.state.showDimentionButton &&
                            <Button variant="outline-dark" onClick={() => this.chaek()}>Submit</Button>
                        }<br/>
                        {this.state.showMatrixButton &&
                            <Button variant="outline-dark" onClick={() => this.Cholesky()}>Submit</Button>
                        }
                        

                        <br/><br/><br/>
                        {this.state.showTable &&
                            <Table style={{padding:10}}dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} scroll={{ y: 340 }} />
                        }

                    </div>
                </Card>
            </div>
        );
    }
}
export default Cholesky;




