import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label  } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

function RenderDish({dish}) {
    return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}


   
    
function RenderComments({comments, addComment, dishId}) {
        var commentList =comments.map(comment => {
            return (
                <li key={comment.id} >
                    {comment.comment}                                                                                                                                                                                              
                    <br /><br />
                    -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    <br /><br />
                </li>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentList}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );
}


const DishDetail = props => {
    if (props.dish !=null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                        <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                        </div>
                </div>
            </div>

        );
        
    }
    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;

//-----------------CommentForm class-------------------------//
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

export class CommentForm extends Component{
    constructor(props) {
        super(props);
    this.state = {
        isModalOpen: false
      };
      this.toggleModal = this.toggleModal.bind(this);
      this.handleLogin = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }


  render(){
      return(
        <div>
          <div>
            <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"> Submit comment</span>
            </Button>
          </div>
          <div className="row row-content">
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                            <div className="col-12 ">
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            
                                    <Row className="form-group">
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" id="rating" name="rating" className="form-control" validators={{ required }}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        </Control.select>      
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="author">Your Name</Label>
                                        
                                        <Control.text model=".author" id="author" name="author" className="form-control" validators={{ required, minLength:  minLength(3), maxLength: maxLength(15)}}/>
                                        <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less'}} />
                                        
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="comment">Comment</Label>
                                        
                                        <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" validators={{ required }}/>
                                        <Errors className="text-danger" model=".comment" show="touched" messages={{ required: 'Required'}} />
                                    
                                    </Row>
                                
                                    <Button type="submit" value="submit" color="primary" >Submit</Button>
                                </LocalForm>
                                </div>
                            </ModalBody>
                </Modal>
          </div>
      </div>
      );
  }

}
