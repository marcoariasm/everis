import React from 'react';
import useBeneficiaries from 'modules/Retirement955/api/Afiliado/useBeneficiaries';

const BeneficiariesContext = React.createContext();

export function BeneficiariesProvider(props) {
	const [beneficiaries, setBeneficiaries] = useState({});
}
