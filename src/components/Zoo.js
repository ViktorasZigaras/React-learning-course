import React, { Component } from 'react';
import { CardImg, CardBody, CardTitle, CardText, Navbar } from 'reactstrap';
// import { Card, CardImg, CardBody, CardTitle, CardText, Container, Row, Navbar } from 'reactstrap';
import {Grid} from '@material-ui/core';

class Zoo extends Component {
    constructor (props) {
        super();
        this.state = {
            selected: null,
            count: 0,
            animals: [...props.animals]
        }

        this.selectedAnimal = this.selectedAnimal.bind(this);
    }

    selectedAnimal (animal) {
        // console.log(animal);
        this.setState({selected: animal});
        // console.log(this.state.selected);
        let newCount = this.state.count + 1;
        if (newCount > 3) {
            newCount = 0;
            this.setState({animals: [...this.props.animals]});
            // this.setState({animals: []});
        }
        console.log(newCount);
        this.setState({count: newCount});
        // animal.title = animal.title + ' selected';
    }

    renderSelectedAnimal (animal) {
        if (animal == null) {
            return (
                <div>nera</div>
            );
        } else {
            // animal.title = animal.title + ' selected';
            return (
                // <div>{animal.title}</div>
                <div>{animal.title + ' ' + this.state.count}</div>
            );
        }
    }

    render () {
        const zoo = this.state.animals.map((animal) => {
            return (
                <Grid item sm={6} md={4} onClick={() => this.selectedAnimal(animal)}>
                    <CardImg top src={animal.image} alt={animal.title} />
                    <CardBody>
                        <CardTitle>{animal.title}</CardTitle>
                        {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                        <CardText>{animal.desc}</CardText>
                        {/* <Button>Button</Button> */}
                    </CardBody>
                </Grid>
                // <Col onClick={() => this.selectedAnimal(animal)} sm={6} md={4}>
                //     <Media heading>
                //         {animal.title}
                //     </Media>
                //     <CardImg width="300px" src={animal.image} />
                //     <p>{animal.desc}</p>
                // </Col>
            );
        });
        return (
            <div>
                <Navbar color="primary">{this.renderSelectedAnimal(this.state.selected)}</Navbar>
                <Grid container>
                    {zoo}
                </Grid>
            </div>
            
            // <Container>
            //     <Navbar color="primary">{this.renderSelectedAnimal(this.state.selected)}</Navbar>
            //     <Row height="200px">
            //         {zoo}
            //     </Row>
            // </Container>
        );
    }
}

export default Zoo;