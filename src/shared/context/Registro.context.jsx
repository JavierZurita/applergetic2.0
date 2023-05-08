import React  from "react";

export const RegistroContext = React.createContext({
    email: '',
    contactName: '',
    contactEmail: '',
    contactNumber: '',
    company: '',
    alergiasRegistro: []
});