import { createContext, useContext, useState } from "react";

const OrganisationsContext = createContext({
  agencies: [],
  suppliers: []
});

export const useOrganisationsContext = () => useContext(OrganisationsContext);

export default function OrganisationsContextProvider({ children }) {
    const [agencies, setAgencies] = useState([])
    const [suppliers, setSuppliers] = useState([])

  const value = {
    agencies,
    suppliers,
    setAgencies,
    setSuppliers
  };

  return <OrganisationsContext.Provider value={value}>{children}</OrganisationsContext.Provider>;
}
