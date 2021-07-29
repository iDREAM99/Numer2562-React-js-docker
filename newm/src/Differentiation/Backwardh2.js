import React, {Component} from 'react';
import {Card} from 'antd';
import './test.css';
import {compile} from 'mathjs';
import { Button, FormControl, DropdownButton, Dropdown, InputGroup } from 'react-bootstrap';
import axios from 'axios';
var y,mongo;
class Backwardh2 extends Component {
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
        axios.get('http://192.168.99.100:8080/mongoDB/h2')
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
    backwardh2(x, h, degree) {
        switch (degree) {
            case 1:
                y = (3*this.fx(x) - 4*this.fx(x-(1*h)) + this.fx(x-(2*h))) / (2*h)
                break;
            case 2:
                y = (2*this.fx(x) - 5*this.fx(x-(1*h)) + 4*this.fx(x-(2*h)) - this.fx(x-(3*h))) / Math.pow(h, 2)
                break;
            case 3:
                y = (5*this.fx(x) - 18*this.fx(x-(1*h)) + 24*this.fx(x-(2*h)) - 14*this.fx(x-(3*h)) - this.fx(x-(3*h))) / (2*Math.pow(h, 3))
                break;
            default:
                y = (3*this.fx(x) - 14*this.fx(x-(1*h)) + 26*this.fx(x-(2*h)) - 24*this.fx(x-(3*h)) + 11*this.fx(x-(4*h)) - 2*this.fx(x-(5*h))) / Math.pow(h, 4) 
        }
        this.setState({
            showOutput: true
        })
    }

    fx(X) {
        var expr =compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    render() {
        return(
            <div className="test">
                <Card className="test-Gh">
                <h2 className="test-h1">Backward Divided-Differences O(h<sup>2</sup>)</h2>
                <div style={{ padding: "50px" }}>
                    
                        <InputGroup style={{ width: "80%", height: "30%", margin: "auto" }}>
                            <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title="F(X)"
                                id="input-group-dropdown-1"
                            >
                                <Dropdown.Item onClick={() => this.handleauto(1)}>e^(x/3)+x^2</Dropdown.Item>
                               
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
                        <Button id="submit_button" onClick= {
                                ()=>this.backwardh2(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(this.state.degree))
                            }  
                            variant="outline-dark">Submit</Button>
                        
                      
                    {this.state.showOutput && 
                        <Card className="test-Gh">
                            <h1 className="test-h1">Output</h1>
                            <p style={{fontSize: "24px", fontWeight: "bold"}}>
                                Approximate = {y}<br/>
                            </p>
                        </Card>
                    }              
                </div>   
                </Card>                
            </div>
        );
    }
}
export default Backwardh2;