import React, { useEffect, useState, useRef } from 'react';

import AdvisorySequence from './components/Tab/AdvisorySequence';
import GetAdvice from 'modules/Retirement955/pages/Advisory/components/Steps/GetAdvice/GetAdvice';
import RegisterBeneficiaries from 'modules/Retirement955/pages/Advisory/components/Steps/RegisterBeneficiaries/RegisterBeneficiaries';
import Alternatives from 'modules/Retirement955/pages/Advisory/components/Steps/Alternatives/Alternatives';
import AppModule from 'modules/App';

const { useContentScrollTop } = AppModule.hooks;

function Advisory() {
	const [step, setStep] = useState(0);

	useContentScrollTop();
	return (
		<>
			<AdvisorySequence step={step} setStep={setStep}>
				<GetAdvice step={step} setStep={setStep} />
				<RegisterBeneficiaries step={step} setStep={setStep} />
				<Alternatives step={step} setStep={setStep} />
			</AdvisorySequence>
		</>
	);
}

export default Advisory;
