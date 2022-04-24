import { useState, useRef } from "react";
//components
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import { InputGroup } from "react-bootstrap";

const PaginationBar = (props) => {
  const { currentPage, maxPages, changePage, changePageSize, goToPage } = props;
  const [validated, setValidated] = useState(true);
  const pageInputRef = useRef();

  const handlePageSubmit = (event) => {
    event.preventDefault();
    const pageInput = +pageInputRef.current.value;
    if (pageInput < 1 || pageInput > maxPages) {
      setValidated(false);
      return;
    }
    goToPage(pageInput);
    pageInputRef.current.value = "";
    setValidated(true);
  };

  const atStart = [1, 2].includes(currentPage);
  const atEnd = [maxPages, maxPages - 1, maxPages - 2].includes(currentPage);
  const threePageMax = maxPages <= 3;

  const getPaginationArray = (currentPage, maxPages) => {
    if (maxPages <= 3) {
      let arr = [];
      for (let i = 1; i <= maxPages; i++) {
        arr.push(i);
      }
      return arr;
    }
    if (maxPages > 3 && currentPage < 3) return [1, 2, 3, 4];
    if (maxPages > 3 && maxPages - currentPage < 3)
      return [maxPages - 3, maxPages - 2, maxPages - 1, maxPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const paginationArray = getPaginationArray(currentPage, maxPages);

  const paginationItems = paginationArray?.map((item) => (
    <Pagination.Item
      key={item}
      onClick={changePage}
      active={currentPage === item}
    >
      {item}
    </Pagination.Item>
  ));

  return (
    <div className="d-flex flex-row justify-content-between mb-3">

      <Form.Group onChange={changePageSize} className="d-flex mh-50 ">
        <Form.Label>Results per page </Form.Label>
        <Form.Select aria-label="Results per page" size="sm">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </Form.Select>
      </Form.Group>

      <Form onSubmit={handlePageSubmit} className="d-flex">
        <Form.Group>
          <InputGroup hasValidation>
            <Form.Control
              type="number"
              placeholder="Go to page"
              ref={pageInputRef}
              isInvalid={!validated}
            />
            <Form.Control.Feedback type="invalid">
              {`Please enter a page number between 1 - ${maxPages}`}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Button type="submit" className="mh-50">
          Go
        </Button>
      </Form>

      <Pagination>
        {!atStart && !threePageMax && (
          <Pagination.Item onClick={changePage}>{1}</Pagination.Item>
        )}
        {!atStart && !threePageMax && currentPage > 3 && (
          <Pagination.Ellipsis />
        )}
        {paginationItems}
        {!atEnd && !threePageMax && <Pagination.Ellipsis />}
        {!atEnd && (
          <Pagination.Item onClick={changePage}>{maxPages}</Pagination.Item>
        )}
      </Pagination>
    </div>
  );
};

export default PaginationBar;
