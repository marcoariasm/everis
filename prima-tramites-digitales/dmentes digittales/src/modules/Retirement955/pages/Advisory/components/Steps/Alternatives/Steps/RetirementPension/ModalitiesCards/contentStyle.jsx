import React from 'react'
import { propOr } from 'ramda'

import { Characteristics, CoinSection, ContainerText, ContentCaracteristic, TitleSection } from './style'
import { useAlternatives, getSimulationValue } from '../../../../../../../../contexts/AlternativesProvider';


export const ContentCard = ({ amountPension, listPorcentTotals, pension, products, textPension, titleCard }) => {
	const { simulations } = useAlternatives()
  	const retirementPension = propOr({}, '0', simulations)
  	const getSimulation = getSimulationValue(retirementPension)

	return (
		<>
			<ContainerText>
				<TitleSection className='tableBodyTitle'>{titleCard}</TitleSection>
				{products.map((product, keysIndex) => {
					return (
						<ContentCaracteristic key={keysIndex}>
							{products.length > 1 && (
								<p className='tableBodyText' style={{ paddingBottom: 10 }}>
									{product.name}
								</p>
							)}
							{product.values.map((element, indexKey) => {
								return (
									<Characteristics key={indexKey} className='tableBodyText'>
										{element.value}
									</Characteristics>
								)
							})}
						</ContentCaracteristic>
					)
				})}

				<TitleSection className='tableBodyTitle'>{textPension}</TitleSection>
				{listPorcentTotals === 'duo' && (
							<div  style={{ textAlign: 'center' }}>
								<p  className='bodyTextSecundary' style={{ paddingTop: 30 }}>Renta Temporal 1 año</p>
								<CoinSection  className='statementTableBody' style={{ paddingTop: -12 }}>
									{ getSimulation('temporaryRent') }
								</CoinSection>
								<p  className='bodyTextSecundary' style={{ paddingTop: 30 }}>Renta Vitalicia Diferida</p>
								<CoinSection  className='statementTableBody' style={{ paddingTop: -12 }}>
									{ getSimulation('deferredLifeAnnuity') }
								</CoinSection>
							</div>
					)}
				{listPorcentTotals === 'familyLifeIncome' && (
					<CoinSection className='statementTableBody'>
						{getSimulation('familyLifeAnnuity')}
					</CoinSection>
				)}
				{listPorcentTotals === 'scheduledWithdrawal' && (
					<CoinSection className='statementTableBody'>
						{getSimulation('scheduledWithdrawal')}
					</CoinSection>
				)}
			</ContainerText>
		</>
	)
}
