import Form from "react-bootstrap/Form";
import { capitalizeString } from "../../utils/helpers";

const OrganisationQuery = (props) => {
    const {orgType, handleInputFilter} = props
  return (
    <div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" onChange={handleInputFilter}>
          <Form.Label>{capitalizeString(orgType)}</Form.Label>
          <Form.Control type="text" placeholder={`Enter ${orgType}'s name`} />
        </Form.Group>
    </div>
  );
};

export default OrganisationQuery;
