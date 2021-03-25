import React from 'react';
import 'font-awesome/css/font-awesome.css';
import { Modal, ModalHeader, FormFeedback, ModalBody, Label, Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { ConfigureStore } from '../redux/configureStore';


class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCommentModalOpen: false,
            rating: '',
            author: '',
            text: '',
        };

        

     }

    toggleCommentModal = () => {
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        });
    }
    
    handleSubmit = (values) => {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));      
        this.toggleCommentModal();
      };
    render() {
       //Modal Below with validation
        return(
            <div>
             <Button outline onClick={this.toggleCommentModal}><i className="fa fa-lg fa-pencil" aria-hidden="true"/>Submit Comment</Button>
             <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                 <ModalHeader toggle={this.toggleCommentModal}>
                     Submit Comment
                 </ModalHeader>
                 <ModalBody>
                    <LocalForm onSubmit ={(values) => this.handleSubmit(values)}>
                        <div className="form-group">
                        <Label htmlFor="rating">Rating 1 is the worst and 5 is the best!</Label>
                            <Control.select defaultValue="1" className="form-control" model=".rating" id="rating" name="rating">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select>

                        </div>
                        <div className="form-group">
                            <Label htmlFor="author">Your Name</Label>
                            <Control.text placeholder="Your Name" 
                            className="form-control" model=".author" 
                            id="author" name="author"
                            validators={{
                                required: (val) => val && val.length >0,
                                minLength: (val) => val && val.length >2,
                                maxLength: (val) => val && val.length < 15,
                            }}>
                                
                            </Control.text>
                            <Errors
                            className="text-danger"
                            model=".author"
                            show="touched"
                            component="div"
                            messages={{
                                required: "Required",
                                maxLength: "Must be less than 15 characters",
                                minLength: "Must be at least 2 characters",

                            }} />
                        </div>
                        <div className="form-group">
                            <Label htmlFor="text">Comment</Label>
                            <Control.textarea className="form-control" 
                            model=".text" 
                            id="text" 
                            name="text" 
                            rows="6"
                            >
                                
                            </Control.textarea>
                        </div>
                        <Button type="submit" color="primary">Submit</Button>
                    </LocalForm>
                 </ModalBody>
             </Modal>
            </div>
        );
    }
}

/*Displays the campsite clicked*/
function RenderCampsite({campsite}) {
        console.log(campsite);
        return (
            <div className="col-md-5 m-1">
                <Card>
                   <CardBody>
                   <CardImg top src={campsite.image} alt={campsite.name} />
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    /*Displays comments using the map function */
function RenderComments({comments}) {
        if(comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map((comment) => {
                        return (
                            <div>
                                <p>{comment.text}</p>
                                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </div>
                        );
                    })}
                    <CommentForm />
                </div>
            );
                
        } else {
            return (
                <div>Add the first comment for this campsite!
                    <CommentForm /></div>
            );
        };
    }
function CampsiteInfo(props) {
        
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );

        
        } else {
            return (<div></div>);
        }

            
        
    }


export default CampsiteInfo;