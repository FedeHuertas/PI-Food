import React from "react";
import s from './Pagination.module.css'

const Pagination = (props) => {
    const {itemsPerPage, handlePage, totalItems, page} = props;
    const pages = [];

    for(let i=1; i<=Math.ceil(totalItems/itemsPerPage); i++) {
        pages.push(i);
    };

    return (
        <div className={s.container} >
            {pages.length && pages.map(p => <button key={p} onClick={() => handlePage(p)} className={p === page+1 ? s.selected : null} >{p}</button>)}
        </div>
    );
};

export default Pagination;