import React,{Component} from 'react';
import {Navbar, NavbarBrand,Nav,NavbarToggler,Collapse,NavItem,Jumbotron,Modal,ModalHeader,ModalBody,Button, FormGroup,Form,Col,Label,Input} from 'reactstrap';
import {NavLink} from 'react-router-dom';
class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isNavOpen:false,
            isModalOpen:false
        }
        this.toggleNav = this.toggleNav.bind(this) // just another way of doing 
        this.toggleModal = this.toggleModal.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        
    }
    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    handleLogin(event){
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
        + " Remember: " + this.remember.checked);
        event.preventDefault();
    }
    render(){
        return(
            // shortform for fragment
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="/assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion"/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"> Home</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg"> About Us</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg"> Menu</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg"> Contact Us</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"></span> Login
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante Con Fusion</h1>
                                <p>
                                    We take inspiration from the World, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses !
                                </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                            <Label htmlFor="firstname" md={2}>Username</Label>
                                <Col md={10}>
                                    <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password" md={2}>Password</Label>
                                <Col md={10}>
                                    <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="remember" name="remember"
                                    innerRef={(input) => this.remember = input}
                                    />{' '}
                                    <strong>Remember me</strong>
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Col>
                                    <Button type="submit" value="submit" color="primary">
                                        Login
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
            // long form <React.Fragment></>
        );
    }
}
export default Header;