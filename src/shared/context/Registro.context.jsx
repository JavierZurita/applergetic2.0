import React  from "react";

export const RegistroContext = React.createContext({
    contactName: '',
    contactEmail: '',
    contactNumber: '',
    company: '',
    alergiasRegistro: []
});