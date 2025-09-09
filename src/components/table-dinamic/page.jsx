import { Outlet } from 'react-router-dom';
import { ServicesProvider } from './context';
import ListUsersPage from './list';

import React from 'react';

const TableComponent = (props) => {
  return (
    <ServicesProvider>
      <ListUsersPage model={props?.model}/>
    </ServicesProvider>
  );
};


export default TableComponent;
