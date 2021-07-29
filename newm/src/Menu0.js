import React from 'react';
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class Menu0 extends React.Component {

  render() {
    return (

      <div>

        <Menu mode="horizontal" theme="dark">

          <SubMenu
            title={
              <span >
                <Icon type="setting" />
                Root of Equation
            </span>
            }>

            <Menu.ItemGroup >
              <Menu.Item key="setting:0">Graphical<NavLink to="/Graphical" /></Menu.Item>
              <Menu.Item key="setting:1">Bisection<NavLink to="/Bisection" /></Menu.Item>
              <Menu.Item key="setting:2">False Position<NavLink to="/FalsePosition" /></Menu.Item>
              <Menu.Item key="setting:4">Newton Raphson<NavLink to="/NewtonRaphson" /></Menu.Item>
              <Menu.Item key="setting:6">Taylor<NavLink to="/Taylor" /></Menu.Item>
              <Menu.Item key="setting:5">Onepoint<NavLink to="/Onepoint" /></Menu.Item>
              <Menu.Item key="setting:7">Secant<NavLink to="/Secant" /></Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>



          <SubMenu
            title={
              <span >
                <Icon type="setting" />
                Linear Algebra
            </span>
            }
          >
            <Menu.ItemGroup >
              <Menu.Item key="setting:8">Cramer<NavLink to="/Cramer" /> </Menu.Item>
              <Menu.Item key="setting:11" disabled>Jacobi<NavLink to="/Jacobi" /></Menu.Item>
              <Menu.Item key="setting:9">Gauss<NavLink to="/Gauss" /></Menu.Item>
              <Menu.Item key="setting:12" >Jordan<NavLink to="/Jordan" /></Menu.Item>
              <Menu.Item key="setting:13" >LU<NavLink to="/LU" /></Menu.Item>
              <Menu.Item key="setting:14" disabled>Seidel<NavLink to="/Seidel" /></Menu.Item>
              <Menu.Item key="setting:21" >Cholesky<NavLink to="/Cholesky" /></Menu.Item>
              <Menu.Item key="setting:10" disabled>Gradient<NavLink to="/Gradient" /></Menu.Item>

            </Menu.ItemGroup>

          </SubMenu>



          <SubMenu
            title={
              <span >
                <Icon type="setting" />
                Integration
            </span>
            }>

            <Menu.ItemGroup >
              <Menu.Item key="setting:22" disabled>CompositeSimpson<NavLink to="/CompositeSimpson" /></Menu.Item>
              <Menu.Item key="setting:23">CompositeTrapzoidal<NavLink to="/CompositeTrapzoidal" /></Menu.Item>
              
            </Menu.ItemGroup>
          </SubMenu>







          <SubMenu
            title={
              <span >
                <Icon type="setting" />
                Divided Differences
            </span>
            }>

            <Menu.ItemGroup >
              <Menu.Item key="setting:15">Backwardh<NavLink to="/Backwardh" /></Menu.Item>
              <Menu.Item key="setting:16">Backwardh2<NavLink to="/Backwardh2" /></Menu.Item>
              <Menu.Item key="setting:17">Centralh2<NavLink to="/Centralh2" /></Menu.Item>
              <Menu.Item key="setting:18">Centralh4 <NavLink to="/Centralh4" /></Menu.Item>
              <Menu.Item key="setting:19">Forwardh<NavLink to="/Forwardh" /></Menu.Item>
              <Menu.Item key="setting:20">Forwardh2<NavLink to="/Forwardh2" /></Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>



        </Menu>
      </div>
    );
  }
}
export default Menu0;