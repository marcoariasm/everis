import React from 'react';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';

import NewTable from 'modules/procedures/shared/components/NewTable';
import IconUserActive from 'shared/images/iconos/user-active.svg';
import IconUserInactive from 'shared/images/iconos/user-inactive.svg';
import './table.scss';

const headersTableProcedure = [
  'Ejecutivo',
];

const TableExecutiveList = ({ isEmpty, filterData }) => {
  const history = useHistory();

  const handleToAdminExecutives = (object) => {
    history.push(`/tramites/ejecutivos-list/${object.idExecutive}`);
  };

  const executiveName = (item) => `${item.names} ${item.lastNames}`;

  return (
    <NewTable
      headers={[...headersTableProcedure]}
      isEmpty={isEmpty}
    >
      {filterData.map((item, index) => (
        <Trow className={item.active === '1' ? 't-row' : 't-row inactive'} key={index} clicked={item.selected} onClick={() => handleToAdminExecutives(item)}>
          {(item.active === '1') ?
              <div >
                <Image
                  src={IconUserActive}
                  alt="User"
                  srcset=""
                />
                {executiveName(item)}
              </div>
            : <div onClick={() => handleToAdminExecutives(item)} >
              <Image
                src={IconUserInactive}
                alt="User"
                srcset=""
              />
              {executiveName(item)}
            </div>
          }
        </Trow>
      ))}
    </NewTable>
  );
};

export default TableExecutiveList

const Trow = styled.div`
  background: ${({ clicked }) => clicked && '#E3E3E3'};
  transition: .2s;
`;

const Image = styled.img`
  margin-right: 10px;
`;
