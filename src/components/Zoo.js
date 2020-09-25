import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Container, Row } from 'reactstrap';

class Zoo extends Component {
    constructor (props) {
        super();
        this.state = {
            selected: null
        }
    }

    selectedAnimal (animal) {
        console.log(animal);
        this.setState({selected: animal});
        console.log(this.state.selected);
    }

    renderSelectedAnimal (animal) {
        if (animal == null) {
            return (
                <div>nera</div>
            );
        } else {
            return (
                <div>{animal.title}</div>
            );
        }
    }

    render () {
        const zoo = this.props.animals.map((animal) => {
            return (
                <Card sm={6} md={4}>
                    <CardImg top width="300px" height="200px" src={animal.image} alt={animal.title} />
                    <CardBody>
                        <CardTitle>{animal.title}</CardTitle>
                        {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                        <CardText>{animal.desc}</CardText>
                        {/* <Button>Button</Button> */}
                    </CardBody>
                </Card>
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
            <Container>
                <Row>
                    {zoo}
                </Row>
                {this.renderSelectedAnimal(this.state.selected)}
            </Container>
        );
    }
}

export default Zoo;