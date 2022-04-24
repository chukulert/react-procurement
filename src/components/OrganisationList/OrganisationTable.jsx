import Table from 'react-bootstrap/Table'
import { capitalizeString } from "../../utils/helpers";

const OrganisationTable = ({ listItems, type }) => {

  const listedItems = listItems?.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item}</td>
    </tr>
  ));

  return (
    <Table striped bordered hover responsive>
      <tbody>
        <tr>
          <th>No.</th>
          <th>{capitalizeString(type)}</th>
        </tr>
        {listedItems}
      </tbody>
    </Table>
  );
};

export default OrganisationTable;
