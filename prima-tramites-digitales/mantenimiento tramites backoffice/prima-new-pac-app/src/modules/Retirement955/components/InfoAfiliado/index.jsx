import React from 'react';
import styled from 'styled-components';
import currency from 'currency.js';
import $ from 'global/styles';

import Header from 'modules/Retirement955/components/Header/Header';

import useAfiliadoInformacion from 'modules/Retirement955/api/useAfiliadoInformacion';
import useCic from 'modules/Retirement955/api/useCic';
import usePensionBonus from 'modules/Retirement955/api/usePensionBonus';
import loading from 'shared/images/loading.svg';

import { MESSAGE_ERROR_DEFAULT } from 'modules/Retirement955/constants';

import './style.sass';

const path = ['Jubilación y/o retiro de hasta el 95.5%', 'Etapa 1 - Asesoría'];

const InfoAfiliado = ({ FAD = {} }) => {
  let nameComplete = '';

  const {
    data: pensionBonus,
    isLoading: isLoadingPensionBonus,
    isError: isErrorPensionBonus,
  } = usePensionBonus(FAD.affiliateId);
  const { cic, isLoading: isLoadingCic, isError: isErrorCic } = useCic(FAD.affiliateId);
  const {
    afiliadoInformacion: afiliado,
    isLoading,
    isError,
  } = useAfiliadoInformacion(FAD.affiliateId);

  if (afiliado) {
    nameComplete = `${afiliado.surname || ''} ${afiliado.motherSurname || ''},
    ${afiliado.firstName || ''} ${afiliado.secondName || ''}`;
  }

  const partOne = (
    <>
      {isLoading
        && (<img src={loading} alt="Loading" className="is-loading" />)}
      {isError && <p className="has-error">{MESSAGE_ERROR_DEFAULT}</p>}
      {afiliado && !isError && (
        <>
          <CardItem block="block" gap>
            <div className="label">Apellidos y nombres:</div>
            <div className="value info-p-top nombresApellidos">
              {nameComplete || ''}
            </div>
          </CardItem>
          <CardItem block="block">
            <div className="label">CUSPP:</div>
            <div className="value info-p-top cuspp">{FAD.affiliateId}</div>
          </CardItem>
          <CardItem block="block">
            <div className="label">Estado:</div>
            <div className="value info-p-top estado">{cic ? cic.statusName : '- -'}</div>
          </CardItem>
          <CardItem block="block" mTop="10" gap>
            <div className="label">Tipo de documento:</div>
            <div className="value info-p-top tipoDoc">{afiliado.documentTypeName}</div>
          </CardItem>
          <CardItem block="block" mTop="10">
            <div className="label">N° de documento:</div>
            <div className="value info-p-top numDoc">{afiliado.documentNumber}</div>
          </CardItem>
          <CardItem block="block" mTop="10">
            <div className="label">Edad:</div>
            <div className="value info-p-top edad">
              {afiliado.age}
              {' '}
              años
            </div>
          </CardItem>
        </>
      )}
    </>
  );

  const partTwo = (
    <>
      {isLoadingCic && (<img src={loading} alt="Loading" className="is-loading" />)}
      {isErrorCic && <p className="has-error">{MESSAGE_ERROR_DEFAULT}</p>}
      {cic && !isErrorCic
        && (
        <>
          <CardItem>
            <div className="label">
              Fondos Prima - F{cic?.balances[2].fundType.charAt(5)}
            </div>
            <FormatMoney>
              <div className="value info-p-top">S/</div>
              <div className="value info-p-top f1">
                {currency(cic.balances[2].nominalValue, { symbol: '' }).format()}
              </div>
            </FormatMoney>
          </CardItem>
          <CardItem>
            <div className="label between">
              Con Fin Previsional - F{cic?.balances[1].fundType.charAt(5)}
            </div>
            <FormatMoney>
              <div className="value info-p-top">S/</div>
              <div className="value info-p-top f2">
                {currency(cic.balances[1].nominalValue, { symbol: '' }).format()}
              </div>
            </FormatMoney>
          </CardItem>
        </>
        )}
    </>
  );

  const partThree = (
    <>
      {isLoadingPensionBonus && (<img src={loading} alt="Loading" className="is-loading" />)}
      {isErrorPensionBonus && <p className="has-error">{MESSAGE_ERROR_DEFAULT}</p>}
      {pensionBonus && !isErrorPensionBonus
        && (
        <>
          <CardItem>
            <div>
              <div className="label">Estado</div>
              <div className="value info-p-top estado">{pensionBonus.stateDescription || '- -'}</div>
            </div>
          </CardItem>
          <CardItem className="flex">
            <div className="p-top">
              <div className="label">Valor actualizado</div>
              <div className="value info-p-top valorActualizado">
                S/
                {
                  currency(pensionBonus.updatedValue, { symbol: '' }).format()
                }
              </div>
            </div>
            <div className="p-top">
              <div className="label">Valor nominal</div>
              <div className="value info-p-top valorNominal">
                S/
                {
                  currency(pensionBonus.nominalValue, { symbol: '' }).format()
                }
              </div>
            </div>
          </CardItem>
        </>
        )}
    </>
  );

  return (
    <>
      <div className="flex sb">
        <Header title="Validación de Asesoría" path={path} />
        <FondoObligatorio>
          <div className="sub-title">
            Fondos Obligatorio: Fondo {cic?.balances[0].fundType.charAt(5)}
          </div>
          <div className="value">
            S/
            {currency(cic?.balances[0].nominalValue,
              { symbol: '' }).format()}
          </div>
        </FondoObligatorio>
      </div>
      <Card id="info-afiliado">
        <CarContent className="informacion-afiliado" size="46" mRight="20">
          <div className="sub-title">Información de afiliado</div>
          <CardBody left="20" right="20" number="primero" className="">
            {partOne}
          </CardBody>
        </CarContent>
        <CarContent className="fondos-voluntarios" size="23" mRight="19">
          <div className="sub-title">Fondos Voluntarios:</div>
          <CardBody border="0" left="20" right="20" number="segundo">
            {partTwo}
          </CardBody>
        </CarContent>
        <CarContent size="31" className="bono-reconocimiento">
          <div className="sub-title">
            Bono de
            Reconocimiento:
          </div>
          <CardBody border="0" left="20" right="20" number="tercero">
            {partThree}
          </CardBody>
        </CarContent>
      </Card>
    </>
  );
};

export default React.memo(InfoAfiliado);

const maxWidth = '100%';
const minWidth = '1002px';

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: ${minWidth};
  max-width: ${maxWidth};
  margin-top: 32px;
  background-color: ${$.blanco};
  border-radius: 8px;
  box-shadow: 0px 1.72063px 29.5496px rgba(0, 0, 0, 0.04);
  padding-left: 48px;
  padding-right: 48px;
  padding-top: 40px;
  padding-bottom: 30px;
`;

const CarContent = styled.div`
  width: ${(props) => `${props.size}%`};
  margin-right: ${({ mRight }) => (mRight ? `${mRight}px` : '0px')};
  &:last-child {
    border: none;
  }
`;

const CardBody = styled.div`
  display: grid;
  grid-template-columns: ${({ number }) => {
    switch (number) {
      case 'primero':
        return '42% 37% 21%';
      case 'segundo':
        return '1fr';
      case 'tercero':
        return '1fr';
      default:
        return '';
    }
  }};
  grid-template-rows: ${({ number }) => {
    switch (number) {
      case 'primero':
        return 'minmax(88px, 1fr) auto';
      case 'segundo':
        return 'auto auto';
      case 'tercero':
        return 'auto auto';
      default:
        return '';
    }
  }};
  background: #F7F7F8;
  border-radius: 11px;
  padding-left: ${(props) => `${props.left}px`};
  padding-right: ${(props) => `${props.right}px`};
  padding-top: 35px;
  padding-bottom: 33px;
  min-height: 216px;
  margin-top: 21px;
  & > .saldoTotal {
    border-radius: 4px;
    background: rgba(196, 196, 196, 0.2);
    height: 38px;
    margin-top: 20px;
    line-height: 38px;
    padding-left: 12px;
    padding-right: 7px;
  }
`;

const CardItem = styled.div`
  display: ${(props) => props.block};
  justify-content: space-between;
  line-height: ${({ lheight }) => (lheight ? `${lheight}` : 'normal')};
  padding-top: ${({ mTop }) => (mTop ? `${mTop}px` : '0px')};
  padding-right: ${({ gap }) => (gap ? '10px' : '0px')};
  & > .p-top {
    margin-top: 40px;
  }
  & .estado {
    font-size: 17px;
  }
`;

const FormatMoney = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${$.gris};
  font-size: 16px;
  width: 120px;
`;

const FondoObligatorio = styled.div`
  width: 277px;
  height: 80px;
  text-align: center;
  background: ${$.blanco};
  border-radius: 6px;
  filter: drop-shadow(0px 4px 4px rgba(105, 97, 88, 0.03));
  padding-top: 15px;
  padding-bottom: 11px;
  & .sub-title {
    font-weight: 600;
    font-size: 16px;
  }
  & .value {
    font-family: FS Emeric;
    padding-top: 5px;
  }
`;
