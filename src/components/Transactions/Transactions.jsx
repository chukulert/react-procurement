import { useEffect, useState, useCallback } from "react";
//components
import PaginationBar from "../Pagination/Pagination";
import TransactionTable from "./TransactionTable";
import TransactionQuery from "./TransactionQuery";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [contractAmt, setContractAmt] = useState(null);
  const [year, setYear] = useState(null);
  const [agency, setAgency] = useState(null);
  const [maxPages, setMaxPages] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://morning-hollows-07984.herokuapp.com/api/gov-procurement/procurements?page=${currentPage}&pageSize=${pageSize}`
          // url below is used for development
          // `https://tranquil-stream-73766.herokuapp.com/https://morning-hollows-07984.herokuapp.com/api/gov-procurement/procurements?page=${currentPage}&pageSize=${pageSize}`
        );

        const transactionsData = await response.json();
        setTransactions(transactionsData.data);
        setDisplayedTransactions(transactionsData.data);
        setCurrentPage(transactionsData.page);
        setMaxPages(transactionsData.totalPages);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchTransactions();
    setError(null);
  }, [currentPage, pageSize]);

  const applyFilters = useCallback(
    (arr) => {
      let filteredArray = arr;
      if (contractAmt)
        filteredArray = filterContractAmount(filteredArray, contractAmt);
      if (year) filteredArray = filterYear(filteredArray, year);
      if (agency) filteredArray = filterAgency(filteredArray, agency);
      return filteredArray;
    },
    [agency, year, contractAmt]
  );

  useEffect(() => {
    if (transactions) {
      const filteredTransactions = applyFilters(transactions);
      setDisplayedTransactions(filteredTransactions);
    }
  }, [contractAmt, year, agency, transactions, applyFilters]);

  //pagination functions

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const changePageSize = (event) => {
    setPageSize(+event.target.value);
    setCurrentPage(1);
  };

  //handle contract amount filter functions
  const filterContractAmount = (arr, amount) => {
    let filteredArr = arr;
    switch (amount) {
      case 1:
        return filteredArr.filter(
          (transaction) => +transaction.awardedAmt < 100000
        );
      case 2:
        return filteredArr.filter(
          (transaction) =>
            100000 < +transaction.awardedAmt && +transaction.awardedAmt < 500000
        );
      case 3:
        return filteredArr.filter(
          (transaction) =>
            500000 < +transaction.awardedAmt &&
            +transaction.awardedAmt < 1000000
        );
      case 4:
        return filteredArr.filter(
          (transaction) =>
            1000000 < +transaction.awardedAmt &&
            +transaction.awardedAmt < 5000000
        );
      case 5:
        return filteredArr.filter(
          (transaction) => 5000000 < +transaction.awardedAmt
        );
      default:
        return;
    }
  };

  const handleContractAmountFilter = (event) => {
    const selectedAmount = +event.target.value;
    setContractAmt(selectedAmount);
  };

  //handle agency filter functions
  const handleAgencyFilter = (event) => {
    const input = event.target.value.toString().toLowerCase();
    setAgency(input);
  };

  const filterAgency = (arr, input) => {
    let filteredArr = arr;
    filteredArr = arr.filter((item) =>
      item.agency.toString().toLowerCase().includes(input)
    );
    return filteredArr;
  };

  //handle year filter functions
  const handleYearFilter = (event) => {
    const input = +event.target.value;
    setYear(input);
  };

  const filterYear = (arr, input) => {
    let filteredArr = arr;
    filteredArr = arr.filter((item) =>
      item.yearAwarded.toString().includes(input)
    );
    return filteredArr;
  };

  return (
    <>
      <TransactionQuery
        handleContractAmountFilter={handleContractAmountFilter}
        handleYearFilter={handleYearFilter}
        handleAgencyFilter={handleAgencyFilter}
      />
      {!isLoading && !error && (
        <div>
          <span>Results: {displayedTransactions.length}</span>
          <TransactionTable transactions={displayedTransactions} />
          <PaginationBar
            currentPage={currentPage}
            pageSize={pageSize}
            maxPages={maxPages}
            changePage={changePage}
            changePageSize={changePageSize}
            goToPage={goToPage}
          />
        </div>
      )}

      {isLoading && !error && <h3>Loading...</h3>}
      {error && (
        <div className="alert alert-danger">{`Something went wrong. Error: ${error.message}`}</div>
      )}
    </>
  );
};

export default Transactions;
