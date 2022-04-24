import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const NavBar = ({ handleNavClick}) => {
  return (
    <>
      <Navbar bg="light" variant="light" sticky="top">
        <Container>
          <Nav onSelect={handleNavClick} defaultActiveKey="procurement" >
            <Nav.Link eventKey="procurement" >Procurement</Nav.Link>
            <Nav.Link eventKey="supplier" >Suppliers</Nav.Link>
            <Nav.Link eventKey="agency" >Agencies</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
