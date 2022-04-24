import Table from 'react-bootstrap/Table'
import TransactionItem from "./TransactionItem";

const TransactionTable = ({ transactions }) => {
  const transactionItems = transactions?.map((transaction, index) => (
    <TransactionItem
      key={index}
      tenderNo={transaction.tenderNo}
      tenderDescription={transaction.tenderDescription}
      agency={transaction.agency}
      awardDate={transaction.awardDate}
      tenderDetailStatus={transaction.tenderDetailStatus}
      supplierName={transaction.supplierName}
      awardedAmt={transaction.awardedAmt}
      yearAwarded={transaction.yearAwarded}
    />
  ));

  return (
    <Table striped bordered hover responsive>
      <tbody>
        <tr>
          <th>CONTRACT</th>
          <th>AGENCY</th>
          <th>SUPPLIER</th>
          <th>YEAR</th>
          <th>AMOUNT</th>
        </tr>
        {transactionItems}
      </tbody>
    </Table>
  );
};

export default TransactionTable;
