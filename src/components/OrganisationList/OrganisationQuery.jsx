import Form from "react-bootstrap/Form";
import { capitalizeString } from "../../utils/helpers";
import { InputGroup } from "react-bootstrap";

const OrganisationQuery = (props) => {
  const { orgType, handleInputFilter, validatedQuery } = props;
  return (
    <div>
      <Form.Group
        className="mb-3"
        controlId="exampleForm.ControlInput1"
        onChange={handleInputFilter}
      >
        <InputGroup hasValidation>
          <Form.Label className='align-self-center pe-3'>{capitalizeString(orgType)}</Form.Label>
          <Form.Control
            type="text"
            placeholder={`Enter ${orgType}'s name. Please enter at least 3 characters`}
            isInvalid={!validatedQuery}
          />
          <Form.Control.Feedback type="invalid">
            Please enter at least 3 characters
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </div>
  );
};

export default OrganisationQuery;
