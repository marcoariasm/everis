import React, { createContext, useContext, useEffect, useState } from 'react';

import { listBeneficiaryService } from 'redux/services/beneficiaries.service';

const BeneficiariesContext = createContext();

export function BeneficiariesProvider(props) {
	const [beneficiaries, setBeneficiaries] = useState([]);

	const getBeneficiaries = () => {
		listBeneficiaryService().then((response) => {
			setBeneficiaries(response);
		});
	};

	useEffect(() => {
		getBeneficiaries();
	}, []);

	return <BeneficiariesProvider.Provider value={(beneficiaries, setBeneficiaries)} {...props} />;
}

export function useBeneficiariesList() {
	const context = useContext(BeneficiariesContext);
	if (!context) {
		throw new Error('BeneficiariesProvider provider is required');
	}
	return context;
}
