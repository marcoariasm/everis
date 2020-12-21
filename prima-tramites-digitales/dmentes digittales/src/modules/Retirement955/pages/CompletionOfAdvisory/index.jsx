import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { prop, toLower, not } from 'ramda';

import usePerfilamiento from 'modules/Retirement955/api/Perfilamiento/usePerfilamiento';
import useTotalBalance from 'modules/Retirement955/api/Globales/useTotalBalance';
import useInformation from 'modules/Retirement955/api/Globales/useInformation';
import useContactInfo from 'modules/Retirement955/api/Afiliado/useAffiliateContact';

import useGetBusinessDays from 'modules/Retirement955/hooks/useGetBusinessDays';

import { BUSINESS_DAY } from 'modules/Retirement955/constants/Parameters';

import WhiteCard from 'modules/shared/components/WhiteCard';
import { Loading } from 'global/components/v1/Loading';
import { HeaderMain } from './HeaderMain';
import Header from 'modules/shared/components/Header';
import { GridAdvisoryInformation } from './GridAdvisoryInformation';
import ContentButton from './FooterSection/ContentButton';
import CardGray from 'modules/shared/components/CardGrey';
import AppModule from 'modules/App';

const { useModalConfirmLeave } = AppModule.providers.ModalConfirmLeave;

export default function CompletionOfAdvisory() {
	const { setHoldNavigation, setConfirmContent } = useModalConfirmLeave();

	const { totalBalance, isLoading: isLoadingTotalBalance } = useTotalBalance();
	const { profiling, isLoading: isLoadingProfiling } = usePerfilamiento();
	const { information } = useInformation(BUSINESS_DAY);
	const { contactInfo } = useContactInfo({
		authenticated: false,
	});

	const businessDays = useGetBusinessDays(prop('LIMIT_DAYS', information));
	// ToDo: change checkNoRuc field name in store
	const hasRuc = useSelector((state) => not(state.advisor.checkNoRuc));
	const days = moment(businessDays).format('DD/MM/YYYY');
	const email = prop('email', contactInfo.data);
	const mount = totalBalance && totalBalance.totalAmount;

	if (isLoadingProfiling || contactInfo.loading || isLoadingTotalBalance) {
		return <Loading />;
	}
	return (
		<>
			<CardGray>
				<Header title='Etapa 01: Asesoría' text='' />
			</CardGray>
			<WhiteCard>
				<HeaderMain mount={mount} />
				<GridAdvisoryInformation
					amount={mount}
					days={days}
					email={toLower(email)}
					profile={profiling.regime}
					hasRuc={hasRuc}
				/>
				<ContentButton />
			</WhiteCard>
		</>
	);
}
