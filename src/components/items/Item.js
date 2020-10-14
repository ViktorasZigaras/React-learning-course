import React from 'react';
import { CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import { Grid } from '@material-ui/core';

const Item = (props) => {
    const imagesList = [props.data.image, 'assets/images/image1.jpg', 'assets/images/image2.jpg', 'assets/images/image3.jpg'];
    const image = imagesList[props.image];
    return (
        <Grid item xs={12} sm={6} md={4}>
            <CardImg top height="300px" src={image} alt={props.data.title} />
            <CardBody>
                <CardTitle>{props.data.title}</CardTitle>
                <CardText>{props.data.desc}</CardText>
                <CardText>Quantity: {props.data.quantity}</CardText>
                <CardText>Price: {props.data.price}</CardText>
                <CardText>Sale: {props.data.sale + ''}</CardText>
            </CardBody>
        </Grid>
    );
}

export default Item;