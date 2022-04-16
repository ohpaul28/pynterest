import React from 'react';

const SelectedContext = React.createContext({});

export const SelectedProvider = SelectedContext.Provider;
export default SelectedContext;
