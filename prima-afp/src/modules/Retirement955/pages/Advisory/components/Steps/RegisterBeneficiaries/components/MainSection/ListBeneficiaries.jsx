import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { textRegBeneficiaries } from 'modules/Retirement955/constants/ConstantRegisterBeneficiaries';
import { textDataValidation } from 'modules/Retirement955/constants/ConstantDataValidation';
import { propOr, find, propEq, pipe, map, pick, mergeRight } from 'ramda';

import GridInfoBeneficiaries from 'modules/Retirement955/pages/Advisory/components/Steps/RegisterBeneficiaries/components/MainSection/GridInfoBeneficiaries';
import CardDataBeneficiarie from './CardDataBeneficiarie';
import Card from 'global/components/v2/Card/Card';
import { toCamelCase } from 'modules/shared/helpers/HelperForm';

const ListBeneficiaries = ({
	beneficiaries,
	getDocumentSelected,
	length,
	setEditBenef,
	setListBeneficiaries,
	listDocumentsTypes,
	genders,
	relationShips,
	disabledOptions,
}) => {
	const fieldToCapitalize = (beneficiaryData) => {
		const UpperCasedFields = ['surname', 'motherSurname', 'firstName', 'secondName'];
		return mergeRight(beneficiaryData, map(toCamelCase, pick(UpperCasedFields, beneficiaryData)));
	};

	const info = map(
		pipe(
			(beneficiary) => ({
				...beneficiary,
				documentTypeValueName: pipe(
					find(propEq('type', beneficiary?.documentType)),
					propOr('---', 'shortName')
				)(listDocumentsTypes || []),
				relationshipValueName: propOr('---', beneficiary?.relationship, relationShips),
				genderValueName: propOr('---', beneficiary?.gender, genders),
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
								item={element}
								title={`Beneficiario ${i + 1}`}
								options
								optionBlock={element.beneficiaryId}
								blocked={i < length ? true : false}
								type='beneficiaries'
								cardOpen={i === info.length - 1}>
								<GridInfoBeneficiaries>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[0].value}
										value={
											`${element?.surname}` ? `${element?.surname}` : textDataValidation.infoBeneficiary.noInfo
										}
										doNotDisplayLine={false}
									/>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[1].value}
										value={
											`${element?.motherSurname}`
												? `${element?.motherSurname}`
												: textDataValidation.infoBeneficiary.noInfo
										}
										doNotDisplayLine={false}
									/>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[2].value}
										value={
											`${element?.firstName}` ? `${element?.firstName}` : textDataValidation.infoBeneficiary.noInfo
										}
										doNotDisplayLine={false}
									/>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[3].value}
										value={
											`${element?.secondName}`
												? `${element?.secondName}`
												: textDataValidation.infoBeneficiary.noInfo
										}
										doNotDisplayLine={false}
									/>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[4].value}
										value={`${element?.documentTypeValueName}`}
										doNotDisplayLine={false}
									/>
									<CardDataBeneficiarie
										title={textRegBeneficiaries.beneficiary[5].value}
										value={
											`${element?.documentNumber}`
												? `${element?.documentNumber}`
												: textDataValidation.infoBeneficiary.noInfo
										}
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
										value={`${element?.hasDisability}` === 'false' ? 'Sano' : 'Inválido'}
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
