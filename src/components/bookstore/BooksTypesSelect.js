import React from 'react';

const BooksTypesSelect = ({types, handleSelectType, selectType}) => {
    return (
        <select onChange={handleSelectType} value={selectType}>
            {types.map((type) => (<option key={type.id} value={type.id}>{type.title}</option>))}
        </select>
    )
}

export default BooksTypesSelect;