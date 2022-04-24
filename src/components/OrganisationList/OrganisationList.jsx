import { useEffect, useState } from "react";
//components
import PaginationBar from "../Pagination/Pagination";
import OrganisationQuery from "./OrganisationQuery";
import OrganisationTable from "./OrganisationTable";
//helpers
import { calculateMaxPages, paginateResults } from "../../utils/helpers";
import { useOrganisationsContext } from "../../store/OrganisationsContext";

const OrganisationList = (props) => {
  const { url, orgType } = props;
  const [organisations, setOrganisations] = useState([]);
  const [displayedOrganisations, setDisplayedOrganisations] = useState([]);
  const [query, setQuery] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [maxPages, setMaxPages] = useState(null);
  const [validatedQuery, setValidatedQuery] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { agencies, suppliers, setAgencies, setSuppliers } =
    useOrganisationsContext();

  useEffect(() => {
    const fetchOrganisationList = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${url}`);

        const organisationsData = await response.json();
        const organisationsMaxPages = calculateMaxPages({
          arr: organisationsData,
          pageSize: 10,
        });
        const currentDisplayedAgencies = paginateResults({
          arr: organisationsData,
          pageSize: 10,
          currentPage: 1,
        });
        if (orgType === "agency") setAgencies(organisationsData);
        if (orgType === "supplier") setSuppliers(organisationsData);
        setOrganisations(organisationsData);
        setMaxPages(organisationsMaxPages);
        setDisplayedOrganisations(currentDisplayedAgencies);
      } catch (error) {
        setError(error);
      }
    };

    if (orgType === "agency" && agencies.length === 0) fetchOrganisationList();
    if (orgType === "supplier" && suppliers.length === 0)
      fetchOrganisationList();
    if (orgType === "agency" && agencies.length !== 0)
      setOrganisations(agencies);
    if (orgType === "supplier" && suppliers.length !== 0)
      setOrganisations(suppliers);
    setIsLoading(false);
    setError(null);
  }, [
    setIsLoading,
    url,
    agencies,
    suppliers,
    orgType,
    setAgencies,
    setSuppliers,
  ]);

  useEffect(() => {
    const currentDisplayedAgencies = paginateResults({
      arr: organisations,
      pageSize,
      currentPage,
    });
    const agenciesMaxPages = calculateMaxPages({
      arr: organisations,
      pageSize,
    });
    setMaxPages(agenciesMaxPages);
    setDisplayedOrganisations(currentDisplayedAgencies);
  }, [currentPage, organisations, pageSize, maxPages]);

  useEffect(() => {
    if (organisations && query) {
      const filteredAgencies = filterAgency(organisations, query);
      setDisplayedOrganisations(filteredAgencies);
    }
  }, [organisations, query]);

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
  };

  //handle organisation filter functions
  const handleInputFilter = (event) => {
    const input = event.target.value.toString().toLowerCase();
    if (input.length < 3 && input.length > 0) {
      setValidatedQuery(false);
      return;
    }
    if (!input) {
      setDisplayedOrganisations(
        paginateResults({
          arr: organisations,
          pageSize,
          currentPage,
        })
      );
    }
    setValidatedQuery(true);
    setQuery(input);
  };

  const filterAgency = (arr, input) => {
    let filteredArr = arr;
    filteredArr = arr.filter((item) =>
      item.toString().toLowerCase().includes(input)
    );
    return filteredArr;
  };

  return (
    <>
      {!isLoading && !error && (
        <div>
          <OrganisationQuery
            orgType={orgType}
            handleInputFilter={handleInputFilter}
            validatedQuery={validatedQuery}
          />
          <span>Results: {displayedOrganisations.length}</span>
          <OrganisationTable
            listItems={displayedOrganisations}
            type={orgType}
          />
          {!query && (
            <PaginationBar
              currentPage={currentPage}
              pageSize={pageSize}
              maxPages={maxPages}
              changePage={changePage}
              changePageSize={changePageSize}
              goToPage={goToPage}
            />
          )}
        </div>
      )}
      {isLoading && !error && <h3>Loading...</h3>}
      {error && (
        <div className="alert alert-danger">{`Something went wrong. Error: ${error.message}`}</div>
      )}
    </>
  );
};

export default OrganisationList;
