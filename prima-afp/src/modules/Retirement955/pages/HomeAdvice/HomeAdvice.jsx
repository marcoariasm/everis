import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { size } from 'global/styles/Responsive';
import { useConvertCurrency } from 'modules/Retirement955/hooks/useConvertCurrency';

import { textHeader } from 'modules/Retirement955/constants/ConstantHeader';
import { profilingValue } from 'modules/Retirement955/constants/Parameters';

import usePerfilamiento from 'modules/Retirement955/api/Perfilamiento/usePerfilamiento';
import useAfiliado from 'modules/Retirement955/api/Afiliado/useAfiliado';
import useTotalBalance from 'modules/Retirement955/api/Globales/useTotalBalance';

import WhiteCard from 'modules/shared/components/WhiteCard';
import { Loading } from 'global/components/v1/Loading';
import Header from 'modules/shared/components/Header';
import GridAdviceInformation from 'modules/Retirement955/pages/HomeAdvice/components/MainSection/GridAdviceInformation';
import ContentUsername from 'modules/Retirement955/pages/HomeAdvice/components/TitleSection/ContentUsername';
import ContentButton from 'modules/Retirement955/pages/HomeAdvice/components/FooterSection/ContentButton';
import CardInformationGray from 'modules/Retirement955/pages/HomeAdvice/components/MainSection/CardInformationGray';
import CardGray from 'modules/shared/components/CardGrey';
import ErrorMessage from '../../components/ErrorMessage';
import { prop } from 'ramda';

const TSection = styled.div`
	text-align: left;
	margin: 30px 5px 50px 5px;
	@media only screen and (min-width: ${size.laptop}) and (max-width: ${size.laptopM}) {
		margin: 40px 0 60px 0;
	}
	@media only screen and (min-width: ${size.laptopM}) {
		margin: 40px 0 30px 0;
	}
`;

function HomeAdvice(businessDay) {
	const { totalBalance, isLoading: isLoadingTotalBalance, isError: isErrorTotalBalance } = useTotalBalance();
	const { profiling, isLoading: isLoadingProfiling, isError: isErrorProfiling } = usePerfilamiento();
	const { affiliate, isLoading: isLoadingAffiliate, isError: isErrorAffiliate } = useAfiliado();
	const user = affiliate?.firstName.trim();
	const hasError = () => isErrorTotalBalance || isErrorProfiling || isErrorAffiliate;
	const isLoading = () => isLoadingTotalBalance || isLoadingProfiling || isLoadingAffiliate;

	const mount = useConvertCurrency(prop('totalAmount', totalBalance));

	const getMainContent = () => (
		<>
			<CardGray>
				{profiling.regime === profilingValue[0].value && <Header title='' text={textHeader.textReja} />}
				{(profiling.regime === profilingValue[1].value ||
					profiling.regime === profilingValue[2].value ||
					profiling.regime === profilingValue[3].value) && <Header title='' text={textHeader.textLegal} />}
			</CardGray>
			<WhiteCard>
				<ContentUsername
					user={user}
					text={`, al ${moment(businessDay).format('DD/MM/YYYY')} hemos logrado juntos un ahorro total de:`}
				/>
				<CardInformationGray title='' text={mount} />
				<TSection className='tableBodyText'>
					Es momento de decidir qué hacer con tu fondo de pensión. Te asesoraremos y acompañaremos para que tomes
					la mejor decisión para tu futuro y el de tu familia. El proceso de decisión consta de dos etapas:
				</TSection>
				<GridAdviceInformation amount={`${totalBalance.totalAmount}`} profile={profiling?.regime} />
				<ContentButton />
			</WhiteCard>
		</>
	);

	return <>{isLoading() ? <Loading /> : hasError() ? <ErrorMessage /> : getMainContent()}</>;
}

export default HomeAdvice;
