import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
handle () {

  sessionStorage.removeItem('jwt');
  this.props.history.push('/login')
}

  render () {
   let logged;
   if (sessionStorage.getItem('jwt')){
     logged =  (<NavItem>
                <NavLink tag={Link} to="/login" className="text-dark" onClick={this.handle} >Logout</NavLink>
             </NavItem>)
   }else{
     
      logged = [<NavItem>
        <NavLink tag={Link} to="/register" className="text-dark" >Register</NavLink>
      </NavItem>,
      <NavItem>
        <NavLink tag={Link} to="/login" className="text-dark" >Login</NavLink>
      </NavItem> ]
      
   }
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/to-do">To Do</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
            
                
                {logged}
              
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
