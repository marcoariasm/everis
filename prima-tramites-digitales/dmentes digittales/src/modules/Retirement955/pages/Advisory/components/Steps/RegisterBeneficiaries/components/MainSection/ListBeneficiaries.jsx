import React, { useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { propOr, find, propEq, pipe, map, pick, mergeRight } from 'ramda';

import { textRegBeneficiaries } from 'modules/Retirement955/constants/ConstantRegisterBeneficiaries';
import { textDataValidation } from 'modules/Retirement955/constants/ConstantDataValidation';

import { toCamelCase } from 'modules/shared/helpers/HelperForm';

import GridInfoBeneficiaries from 'modules/Retirement955/pages/Advisory/components/Steps/RegisterBeneficiaries/components/MainSection/GridInfoBeneficiaries';
import CardDataBeneficiarie from './CardDataBeneficiarie';
import Card from 'global/components/v2/Card/Card';

const ListBeneficiaries = ({
	conditionDisability,
	beneficiaries,
	disabledOptions,
	disabledCheck,
	genders,
	getDocumentSelected,
	length,
	listDocumentsTypes,
	relationShips,
	selectBenef,
	setEditBenef,
	setListBeneficiaries,
}) => {
	const fieldToCapitalize = (beneficiaryData) => {
		const UpperCasedFields = ['surname', 'motherSurname', 'firstName', 'secondName'];
		return mergeRight(beneficiaryData, map(toCamelCase, pick(UpperCasedFields, beneficiaryData)));
	};

	const info = map(
		pipe(
			(beneficiary) => ({
				...beneficiary,
				conditionDisabilityValueName: pipe(
					find(propEq('idParameter', parseInt(beneficiary?.disability))),
					propOr('---', 'value')
				)(conditionDisability || []),
				documentTypeValueName: pipe(
					find(propEq('idParameter', parseInt(beneficiary?.documentType))),
					propOr('---', 'abbreviature')
				)(listDocumentsTypes || []),
				genderValueName: pipe(find(propEq('idParameter', parseInt(beneficiary?.gender))), propOr('---', 'value'))(genders || []),
				relationshipValueName: pipe(
					find(propEq('idParameter', parseInt(beneficiary?.relationship))),
					propOr('---', 'value')
				)(relationShips || []),
			}),
			fieldToCapitalize
		),
		beneficiaries
	);

	return (
		<>
			{info &&
				info.map((element, i) => {
					return (
						<ContentCards key={i}>
							<Card
								onClick={() =>
									setEditBenef(() => {
										return {
											...element,
										};
									})
								}
								onDelete={setListBeneficiaries}
								onChange={getDocumentSelected}
								hideOptions={disabledOptions}
								disabledCheck={disabledCheck}
								item={element}
								title={`Beneficiario ${i + 1}`}
								options
								optionBlock={element.beneficiaryId}
								optionCheck={true}
								blocked={i < length ? true : false}
								type='beneficiaries'
								checkCard={find((d) => d === element.documentNumber, selectBenef) ? true : false}
								cardOpen={i === info.length - 1}>
								<GridInfoBeneficiaries>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[0].value}
										value={`${element?.surname}` ? `${element?.surname}` : textDataValidation.infoBeneficiary.noInfo}
										doNotDisplayLine={false}
									/>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[1].value}
										value={`${element?.motherSurname}` ? `${element?.motherSurname}` : textDataValidation.infoBeneficiary.noInfo}
										doNotDisplayLine={false}
									/>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[2].value}
										value={`${element?.firstName}` ? `${element?.firstName}` : textDataValidation.infoBeneficiary.noInfo}
										doNotDisplayLine={false}
									/>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[3].value}
										value={`${element?.secondName}` ? `${element?.secondName}` : textDataValidation.infoBeneficiary.noInfo}
										doNotDisplayLine={false}
									/>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[4].value}
										value={`${element?.documentTypeValueName}`}
										doNotDisplayLine={false}
									/>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[5].value}
										value={`${element?.documentNumber}` ? `${element?.documentNumber}` : textDataValidation.infoBeneficiary.noInfo}
										doNotDisplayLine={false}
									/>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[6].value}
										value={
											`${element?.birthdate}`
												? moment(`${element?.birthDate}`, 'YYYY-MM-DD').format('DD/MM/YYYY')
												: textDataValidation.infoBeneficiary.noInfo
										}
										doNotDisplayLine={false}
									/>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[7].value}
										value={`${element?.genderValueName}`}
										doNotDisplayLine={false}
									/>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[8].value}
										value={`${element?.relationshipValueName}`}
										doNotDisplayLine={false}
									/>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[9].value}
										value={`${element?.conditionDisabilityValueName}`}
										doNotDisplayLine={true}
									/>
								</GridInfoBeneficiaries>
							</Card>
						</ContentCards>
					);
				})}
		</>
	);
};
export default ListBeneficiaries;

const ContentCards = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: 14px;
	margin-bottom: 30px;
`;
