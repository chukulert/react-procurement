import Transactions from "./components/Transactions/Transactions";
import OrganisationList from "./components/OrganisationList/OrganisationList";
import NavBar from "./components/NavBar/NavBar";
import { Container } from "react-bootstrap";
import OrganisationsContextProvider from "./store/OrganisationsContext";
import { useState } from "react";

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
            // url="https://tranquil-stream-73766.herokuapp.com/https://morning-hollows-07984.herokuapp.com/api/gov-procurement/suppliers"
            url="https://morning-hollows-07984.herokuapp.com/api/gov-procurement/suppliers"
            orgType="supplier"
          />
        )}
        {currentTab === "agency" && (
          <OrganisationList
            // url="https://tranquil-stream-73766.herokuapp.com/https://morning-hollows-07984.herokuapp.com/api/gov-procurement/agencies"
            url="https://morning-hollows-07984.herokuapp.com/api/gov-procurement/agencies"
            orgType="agency"
          />
        )}
      </Container>
    </OrganisationsContextProvider>
  );
}

export default App;
