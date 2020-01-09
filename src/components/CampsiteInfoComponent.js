import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';
import { render } from '@testing-library/react';


class CampsiteInfo extends Component {
    constructor(props) {
        super(props);   
    };
    renderCampsite(campsite) {
        return (
            <div className="col-md-5 m-1">
                 <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    };

    renderComments(comments) {
        if (this.props.campsite.comments) {
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {this.props.campsite.comments.map(comment => {
                        return(
                                <div>
                                {comment.text}
                                <br></br>
                                -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </div>
                            );
                        })
                    }
                </div>
            )
        }
    };

    render() {
        if (this.props.campsite != null) {
            return (
                <div className="container">
                    <div className="row">
                        {this.renderCampsite(this.props.campsite)}
                        {this.renderComments(this.props.campsite.comments)}
                    </div>   
                </div>
            )
        } else {
            return (
                <div></div>
            )  
        } 
    }
};


export default CampsiteInfo;



