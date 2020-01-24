import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Form, Row, Col, Label} from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';



const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            author: '',
            comment: '',
            rating: '',
            touched: {
                author: false,
            }
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }
    handleComment() {
        return (
            <div/>
        )

    }

    render() {        
        return (
        <React.Fragment>
            <div className="mt-2" >
                <Button outline  onClick={this.toggleModal}> <i className="fa fa-pencil"/>Submit Comment</Button>
            </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <div className="form-group mt-2">
                                <Col>
                                    <Label>
                                        Rating
                                    </Label>
                                </Col>
                                <Col>
                                    <Control.select model=".rating" name="rating" id="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author" md={3}>Your Name</Label>
                                <Col>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col>
                                    <Control.textarea model=".text" id="text" name="text"
                                        rows="12"
                                        className="form-control"
                                    />
                                </Col>
                            </div>
                            <div className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </div>
                        </LocalForm>
                </Modal>

        </React.Fragment>
    )}
}

function RenderCampsite({campsite}) {
        return (
            <div className="col-md-5 m-1">
                 <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardBody>

                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    };

function RenderComments({comments, addComment, campsiteId}) {
        if (comments) {
            return(
                <div className="col -md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => {
                        return(
                                <div className="m-1">
                                {comment.text}
                                <br></br>
                                -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                
                                
                                </div>
                            );
                        })
                    }
                <CommentForm campsiteId={campsiteId} addComment={addComment} />

            </div>    
            )
            
        }
       
    };

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                    
                </div>
            </div>
        );
    }    
    return <div />;
}


export default CampsiteInfo;



