import React, { Component } from 'react';
import Item from './Item';
import { Grid } from '@material-ui/core';



class ItemList extends Component {
    constructor (props) {
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
        const items = this.props.list.map((item) => <Item data={item} key={item.id} image={this.state.image} />);
        return (
            <Grid container onClick={this.changeImage}>
                {items}
            </Grid>
        );
    }
}

export default ItemList;