import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment';

import NewTable from 'modules/Retirement955/components/NewTable';
import { headersAgenda, noRegister } from 'modules/Retirement955/constants';

import Modules from 'modules/shared';

const { can } = Modules.libs.Roles;

const viewDetail = 'queryFront.table.viewDetail';

const Table = ({
  loading,
  isEmpty,
  frames,
  data,
}) => {
  const location = useLocation();
  const history = useHistory();

  const redirectAgenda = (id, cuspp) => {
    if (location.pathname === '/proceso95-5/consulta') {
      // history.push(`${location.pathname}/${id}`);/consulta/:id/detalle/:cuspp
      history.push(`${location.pathname}/${id}/detalle/${cuspp}`);
    } else {
      history.push(`${location.pathname}/detalle/${id}`);
    }
  };

  return (
    <NewTable
      headers={headersAgenda}
      loading={loading}
      isEmpty={isEmpty}
      frames={frames}
    >
      {data.map((item) => (
        <div className="t-row">
          <div
            className="key"
            style={{
              cursor: (noRegister(item) && item.financialAdviceCode) ? 'pointer' : 'default',
            }}
            onClick={() => {
              if (can(viewDetail) && noRegister(item) && item.financialAdviceCode) {
                redirectAgenda(item.financialAdviceId, item.affiliateId);
              }
            }}
          >
            {item.procedure}
          </div>
          <div>{moment(item.registrationDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}</div>
          <div>{item.affiliateId}</div>
          <div className="left">{item.affiliate}</div>
          <div>{item.statusName}</div>
          <div className="capitalize">
            <span>{item.channel}</span>
          </div>
          <div>
            {
              item.limitDate
                ? moment(item.limitDate, 'YYYY-MM-DD').format('DD-MM-YYYY')
                : '- -'
            }
          </div>
        </div>
      ))}
    </NewTable>
  );
};

export default Table;
