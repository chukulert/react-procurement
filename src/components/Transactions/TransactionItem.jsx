const TransactionItem = (props) => {
  const {
    tenderNo,
    agency,
    supplierName,
    awardedAmt,
    yearAwarded,
  } = props;

  return <tr>
      <td>{tenderNo}</td>
      <td>{agency}</td>
      <td>{supplierName}</td>
      <td>{yearAwarded}</td>
      <td>{awardedAmt}</td>
  </tr>;
};

export default TransactionItem;
