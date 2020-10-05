import React from 'react';
import { CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import { Grid } from '@material-ui/core';

const Item = (props) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <CardImg top height="300px" src={props.data.image} alt={props.data.title} />
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