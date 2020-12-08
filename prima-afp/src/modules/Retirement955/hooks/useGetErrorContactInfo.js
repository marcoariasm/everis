import { useState, useEffect } from 'react';
import { head, isEmpty, filter, pipe, prop, propEq, propOr, isNil } from 'ramda';

const useGetErrorContactInfo = (contactInfo) => {
	const email = prop('email', contactInfo);
	var noCellphone = false;
	var noEmail = false;
	const [error, setError] = useState(null);

	useEffect(() => {
		if (contactInfo) {
			const numberPhone = prop('number', pipe(filter(propEq('type', 'MOBILE_PHONE')), head)(propOr([], 'phones', contactInfo)));

			if (!isNil(numberPhone)) {
				if (isEmpty(numberPhone)) {
					noCellphone = true;
					setError('Por favor registra tu número de celular, da clic en el enlace "Actualizar datos"');
				} else {
					if (numberPhone.startsWith('9') && numberPhone.length === 9) {
						noCellphone = false;
					} else {
						noCellphone = true;
						setError('Por favor registra tu número de celular válido, da clic en el enlace "Actualizar datos"');
					}
				}
			} else {
				noCellphone = true;
				setError('Por favor registra tu número de celular, da clic en el enlace "Actualizar datos"');
			}

			if (!email) {
				noEmail = true;
				setError('Por favor registra tu correo electrónico, da clic en el enlace "Actualizar datos"');
			} else {
				noEmail = false;
			}

			if (noEmail && noCellphone) {
				setError('Por favor registra tu correo electrónico y tu número de celular, da clic en el enlace "Actualizar datos');
			}
			if (!noEmail && !noCellphone) {
				setError(null);
			}
		}
	}, [contactInfo]);
	return error;
};

export default useGetErrorContactInfo;
