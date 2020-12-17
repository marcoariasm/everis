import React from 'react';
import { isEmpty } from 'ramda';

import ArrowLeft from 'shared/images/iconos/arrowLeft.svg';
import ArrowRight from 'shared/images/iconos/arrowRight.svg';
import PrimaLoading from 'shared/images/loading.svg';

import './style.sass';

const index = ({ data = {}, setPage, loading }) => {
	const pagination = !isEmpty(data)
		? !data.currentPage
				? `1 - ${data.financialAdvices.length}`
				: `${(data.currentPage * 10) + 1} - ${(data.currentPage * 10) + data.financialAdvices.length}`
		: '-';

	const previousPage = () => {
		setPage((prevState) => {
			if (prevState === 0) {
				return prevState;
			}
			return prevState - 1;
		});
	};

	const nextPage = () => {
		setPage((prevState) => {
			if (prevState < (data.totalPages - 1)) {
				return prevState + 1;
			}
			return prevState;
		});
	};

  return (
    <div id="pagination">
			{loading
				? <img src={PrimaLoading} alt="Loading" className="is-loading"/>
				: <p>{pagination} de {!isEmpty(data) ? data.totalItems : '-'}</p>
			}
			<div>
				<button className="button-paginacion-1" onClick={previousPage} disabled={loading}>
					<img src={ArrowLeft} alt="ArrowLeft"/>
				</button>
				<button className="button-paginacion-2" onClick={nextPage} disabled={loading}>
					<img src={ArrowRight} alt="ArrowRight"/>
				</button>
			</div>
  </div>
  );
};

export default index;
