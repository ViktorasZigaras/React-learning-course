import React, { Component } from 'react';
import { CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import { Grid } from '@material-ui/core';

class Item extends Component {
    constructor(props) {
      super();
      this.state = { 
          image: 0
      };
    }

    changeImage = (e) => {
        // e.stopPropagation();
        if (0 === this.state.image) {
          this.setState({image: 1});
        }
        else if (1 === this.state.image) {
          this.setState({image: 2});
        } else if (2 === this.state.image) {
            this.setState({image: 3});
        } else if (3 === this.state.image) {
            this.setState({image: 0});
        }
    }

    render () {
        const imagesList = [this.props.data.image, 'assets/images/image1.jpg', 'assets/images/image2.jpg', 'assets/images/image3.jpg'];
        const image = imagesList[this.state.image];
        return (
            <Grid item xs={12} sm={6} md={4} onClick={this.changeImage}>
                <CardImg top height="300px" src={image} alt={this.props.data.title} />
                <CardBody>
                    <CardTitle>{this.props.data.title}</CardTitle>
                    <CardText>{this.props.data.desc}</CardText>
                    <CardText>Quantity: {this.props.data.quantity}</CardText>
                    <CardText>Price: {this.props.data.price}</CardText>
                    <CardText>Sale: {this.props.data.sale + ''}</CardText>
                </CardBody>
            </Grid>
        );
    }
}

export default Item;