import React from 'react';
import Item from './Item';
import { Grid } from '@material-ui/core';

const ItemList = (props) => {
    const items = props.list.map((item) => <Item data={item} />);
    return (
        <Grid container>
            {items}
        </Grid>
    );
}

export default ItemList;