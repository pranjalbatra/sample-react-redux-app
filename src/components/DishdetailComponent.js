import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,ModalBody,ModalHeader,Row,Col,Label } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


    function RenderDish({dish}) {
        if(dish != null){
            return(
                <div className="col-12 col-md-5 m-1">
                      <FadeTransform in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}> 
                        <Card>
                            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                        </Card>
                    </FadeTransform>
                </div> 
            );
        }else{
            return(
                <div></div>
            );
        }
    }

    function RenderComments({comments,postComment,dishId}) {
        if(comments.length){
            const commentArr = comments.map((comment) => {
                return(
                    <Fade in>
                    <li key={comment.id}>
                        <div className="p-1">{comment.comment}</div>
                        <div className="p-1">-- {comment.author}, {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                    </li>
                    </Fade>
                );
            });
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className = "list-unstyled">
                        <Stagger in>
                            {commentArr}
                        </Stagger>
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment}/>
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }

    const  DishDetail = (props) => {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }else if(props.errMsg){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMsg}</h4>
                    </div>
                </div>
            );
        }
        if(props.dish != null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                        </div>
                    </div>
                    <div className = "row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} 
                            postComment={props.postComment} 
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            );
        }else{
            return(<div></div>);
        }
    }

    const maxLength = (len) => (val) => typeof(val) != 'undefined' ? (val.length <= len) : false;
    const minLength = (len) => (val) => typeof(val) != 'undefined' ? (val.length >= len) : false;

    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state = {
                isModalOpen:false
            } 
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }
        handleSubmit(values){
            this.toggleModal();
            this.props.postComment(this.props.dishId,values.rating,values.yourname,values.comment);
        }
        render(){
            return(
                <div>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            {/* FORM START */}
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                <Label md={12} htmlFor="rating">Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" name="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={12} htmlFor="yourname">First Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".yourname" id="yourname" name="yourname"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                minLength:minLength(3), maxLength:maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger" 
                                            model=".yourname" 
                                            show="touched"
                                            messages={{
                                                minLength:'Must be greater than 2 characters',
                                                maxLength:'Must not be greater than 15 characters'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={12} htmlFor="comment">Your Feedback</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="12" className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                            {/* FORM END */}
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }

export default DishDetail;
