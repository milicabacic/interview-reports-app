import React, { useContext } from "react";
import { CandidateContext } from "../../App";
import "./pagination.scss";


const Pagination = (props) => {

    const {candidates} = useContext(CandidateContext);

    const numberOfPages = Math.ceil(candidates.length/15);

    let pageArray = [];

    if(numberOfPages<5) {
      for (let index = 1; index <= numberOfPages; index++) {
        pageArray.push(index);
      }
    } else if (
      props.page === 1 ||
      props.page === 2 ||
      props.page === 3
    ) {
      pageArray = [1, 2, 3, 4, 5];
    } else if (
      props.page === numberOfPages-2 ||
      props.page === numberOfPages-1 ||
      props.page === numberOfPages
    ) {
      pageArray = [numberOfPages-4, numberOfPages-3, numberOfPages-2, numberOfPages-1, numberOfPages];
    } else {
      pageArray = [
        props.page - 2,
        props.page - 1,
        props.page,
        props.page + 1,
        props.page + 2,
      ];
    }
    return (
      <div className="pagination">
        <button className="previousPage" onClick={props.previousPage}>&lt;</button>
        {pageArray.map((e) => {
          return (
            <button
              className={props.page === e ? "activePage" : "inactivePage"}
              onClick={() => {
                props.setPage(e);
              }}
            >
              {e}
            </button>
          );
        })}
        <button className="nextPage" onClick={props.nextPage}>&gt;</button>
      </div>
    );
  }


export default Pagination;