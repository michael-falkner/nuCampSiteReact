import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


/*Displays the campsite clicked*/
function RenderCampsite({campsite}) {
        console.log(campsite);
        return (
            <div className="col-md-5 m-1">
                <Card>
                   <CardBody>
                   <CardImg top src={campsite.image} alt={campsite.name} />
                        <CardTitle>{campsite.name}</CardTitle>
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