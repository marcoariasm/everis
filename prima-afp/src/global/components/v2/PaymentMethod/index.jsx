import React, { useEffect, useState } from 'react';
import { allColors } from '../../../../global/styles/index';
import styled from 'styled-components';
import { RadioButtonSection } from 'global/components/v2/UtilityComponents/components';
import { TwoColumnsContainer } from 'global/components/v2/UtilityComponents';
import MaterialSelect, { OutlinedSelectContainer } from 'global/components/v2/MaterialSelect';
import MaterialInput from 'global/components/v2/MaterialInput';
import { bankAccountOptions, badgeOptions, paymentAccountOptions, cashPickup, accountType, paymentTexts } from './constants';

const PaymentMethod = ({ onChange }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formState, setFormState] = useState({ bankAccountType: '' });

  useEffect(() => {
    if (onChange) onChange(formState);
  }, [formState]);

  const handleSelect = (value, name) => {
    const newValue = value ? value.value : null;
    setFormState({ ...formState, [name]: newValue });
  }

  const handleInput = (value, name) => {
    const newValue = value || null;
    setFormState({ ...formState, [name]: newValue });
  }

  const handleRadioBtn = (value, name) => {
    setFormState({ ...formState, [name]: value });
  }

  return (
    <>
    <RadioButtonSection
        name={paymentTexts.names.bankType}
        onChange={(value) => handleRadioBtn(value, paymentTexts.names.bankType)}
        title={paymentTexts.accountTypeTitle}
        options={bankAccountOptions}
    />
    {
      formState.bankAccountType.length ? <TwoColumnsContainer>
    <OutlinedSelectContainer>
      <MaterialSelect
          onChange={(value) => handleSelect(value, paymentTexts.names.bank)}
          name={paymentTexts.names.bank}
          placeholder={paymentTexts.placeholders.bank}
          optionsContainerStyles={{ marginTop: '10px' }}
          selectOptions={formState.bankAccountType === 'V' ? cashPickup : paymentAccountOptions}
      />
    </OutlinedSelectContainer> 
     {formState.bankAccountType === 'N' && <>
       <OutlinedSelectContainer>
        <MaterialSelect
          onChange={(value) => handleSelect(value, paymentTexts.names.accountType)}
          name={paymentTexts.names.accountType}
          placeholder={paymentTexts.placeholders.accountType}
          optionsContainerStyles={{ marginTop: '10px' }}
          selectOptions={accountType}
        />
        </OutlinedSelectContainer>
        <MaterialInput
          onChange={(value) => handleSelect(value, paymentTexts.names.accountNumber)}
          name={paymentTexts.names.accountNumber}
          placeholder={paymentTexts.placeholders.accountNumber}
        />
        <MaterialInput
          onChange={(value) => handleSelect(value, paymentTexts.names.interNumber)}
          name={paymentTexts.names.interNumber}
          placeholder={paymentTexts.placeholders.interNumber}
        />
      </>}
      </TwoColumnsContainer> : <></>
    }
    </>
  )
};

export default PaymentMethod;