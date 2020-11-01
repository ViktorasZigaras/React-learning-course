import React from 'react';

const Pager = ({one, all, goto}) => {
    const pages = Array(Math.ceil(all.length/one)).fill(null);
    return (
        <span>
            {pages.map((nothing, page) => (<span key={page} onClick={() => goto(page+1)}>Page {page+1}</span>))}
        </span>
    )
}

export default Pager;