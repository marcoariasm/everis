import { equals, not, pipe, prop, propOr } from 'ramda';
import { useSelector } from 'react-redux';
import { finishProcess } from 'modules/Retirement955/services/financialAdvice.service';

const useFinishFinancialAdvices = () => {
	const generateFinancialAdvice = ({ advisor }) => ({
		storageId: propOr(null, 'idDocument', advisor),
		statements: [
			{
				statement: 'LEGAL_PERSON_DECLARATION',
				accepted: prop('checkNoRuc', advisor) || false,
			},
			{
				statement: 'ONP_PENSIONER_DECLARATION',
				accepted: pipe(prop('pensioner'), equals('no'), not)(advisor),
			},
			{
				statement: 'NO_BENEFICIARIES_DECLARATION',
				accepted: prop('djNoBeneficiaries', advisor),
			},
			{
				statement: 'UNEMPLOYMENT_CONDITION_DECLARATION',
				accepted: prop('unemployment', advisor),
			},
			{
				statement: 'VIDEO_PLAYED_DECLARATION',
				accepted: prop('viewVideo', advisor),
			},
			{
				statement: 'FINANCIAL_ADVICE_RECEIVED_DECLARATION',
				accepted: prop('financialAdviceReceived', advisor),
			},
		],
	});

	const financialAdvice = useSelector(generateFinancialAdvice);

	const saveFinancialAdvice = () => {
		return finishProcess(financialAdvice);
	};

	return {
		saveFinancialAdvice,
	};
};

export default useFinishFinancialAdvices;
