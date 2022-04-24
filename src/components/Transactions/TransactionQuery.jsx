import Form from "react-bootstrap/Form";

const TransactionQuery = (props) => {
  const { handleContractAmountFilter, handleYearFilter, handleAgencyFilter } =
    props;
  return (
    <div className='border p-3 mt-3 mb-3'>
      <h5>Transaction filters</h5>
      <div className="d-flex justify-content-between ">

          {/* {Year filter} */}
        <Form.Group
          controlId="exampleForm.ControlInput1"
          onChange={handleYearFilter}
        >
          <Form.Label className='w-100 text-center'>Year</Form.Label>
          <Form.Control type="text" placeholder="Enter year" />
        </Form.Group>

         {/* {Agency filter} */}
        <Form.Group
          controlId="exampleForm.ControlInput1"
          onChange={handleAgencyFilter}
        >
          <Form.Label className='w-100 text-center'>Agency</Form.Label>
          <Form.Control type="text" placeholder="Enter Agency name" />
        </Form.Group>

        {/* {Amount selection} */}
        <Form.Group onChange={handleContractAmountFilter} className="w-25">
          <Form.Label className='w-100 text-center'>Amount</Form.Label>
          <Form.Select aria-label="Contract Amount">
            <option>No Selection</option>
            <option value="1">Less than 100,000</option>
            <option value="2">100,001 - 500,000</option>
            <option value="3">500,001 - 1,000,000</option>
            <option value="4">1,000,000 - 5,000,000</option>
            <option value="5">More than 5,000,000</option>
          </Form.Select>
        </Form.Group>
      </div>
    </div>
  );
};

export default TransactionQuery;
