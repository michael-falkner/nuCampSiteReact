import React from 'react';
import 'font-awesome/css/font-awesome.css';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class CommentForm extends React.Component {
    render() {
        return <Button outline ><i className="fa fa-lg fa-pencil" aria-hidden="true"/>Submit Comment</Button>
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
                <div></div>
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