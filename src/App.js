import { useState } from "react";
//components
import Transactions from "./components/Transactions/Transactions";
import OrganisationList from "./components/OrganisationList/OrganisationList";
import OrganisationsContextProvider from "./store/OrganisationsContext";
import NavBar from "./components/NavBar/NavBar";
import { Container } from "react-bootstrap";

function App() {
  const [currentTab, setCurrentTab] = useState("procurement");

  const handleNavClick = (eventKey) => {
    setCurrentTab(eventKey);
  };

  return (
    <OrganisationsContextProvider>
      <header className="App-header"> </header>
      <NavBar handleNavClick={handleNavClick} currentTab={currentTab} />
      <Container>
        {currentTab === "procurement" && <Transactions />}
        {currentTab === "supplier" && (
          <OrganisationList
            // url="https://morning-hollows-07984.herokuapp.com/api/gov-procurement/suppliers"
            //url below is used during development
            url="https://tranquil-stream-73766.herokuapp.com/https://morning-hollows-07984.herokuapp.com/api/gov-procurement/suppliers"
            orgType="supplier"
          />
        )}
        {currentTab === "agency" && (
          <OrganisationList
            // url="https://morning-hollows-07984.herokuapp.com/api/gov-procurement/agencies"
            //url below is used during development
            url="https://tranquil-stream-73766.herokuapp.com/https://morning-hollows-07984.herokuapp.com/api/gov-procurement/agencies"
            orgType="agency"
          />
        )}
      </Container>
    </OrganisationsContextProvider>
  );
}

export default App;
