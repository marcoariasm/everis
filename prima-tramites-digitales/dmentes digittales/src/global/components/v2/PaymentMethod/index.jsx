import ErrorHandler from "global/components/v2/ErrorHandler";
import MaterialInput from "global/components/v2/MaterialInput";
import MaterialSelect, {
  OutlinedSelectContainer,
} from "global/components/v2/MaterialSelect";
import { TwoColumnsContainer } from "global/components/v2/UtilityComponents";
import { RadioButtonSection } from "global/components/v2/UtilityComponents/components";
import {
  getSelectOptions,
  selectType,
} from "modules/GenericProcedures/services";
import {
  accountNumberValidations,
  interbankAccountNumberValidations,
} from "modules/shared/constant/ConstantValidations";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  paymentTexts } from "./constants";

const PaymentMethod = ({ onChange, getAllProperties = false }) => {
  const [paymentAccountOptions, setpaymentAccountOptions] = useState([]);
  const [bankAccountOptions, setbankAccountOptions] = useState([]);
  const [cashPickup, setcashPickup] = useState([])
  const [accountType, setaccountType] = useState([]);

  const [formStatePaymentMethod, setFormStatePaymentMethod] = useState({
    bankAccountType: "",
  });
  const { bank } = formStatePaymentMethod;
  const isDiferentBank =
    bank !== "7" && bank !== "10" && bank !== "17" && bank !== "70";

  const { register, handleSubmit, formState, control, errors } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const { isValid, touched } = formState;

  useEffect(() => {
    if (onChange) manageStateToSend();
  }, [formStatePaymentMethod]);

  useEffect(() => {
    chargeAllSelects();
  }, []);

  const chargeAllSelects = async () => {
    const paymentMethodResponse = await getSelectOptions(
      selectType.paymentMethod
    );
    const counterBankResponse = await getSelectOptions(selectType.counterBank);
    const banksResponse = await getSelectOptions(selectType.banks);
    const accountTypesResponse = await getSelectOptions(
      selectType.accountTypes
    );

    setbankAccountOptions(paymentMethodResponse);
    setaccountType(accountTypesResponse);
    setpaymentAccountOptions(banksResponse);
    setcashPickup(counterBankResponse);
  };

  const getRequiredInfo = (stateWithValidValue) => {
    const keyList = Object.keys(stateWithValidValue);
    if (!keyList.length) return false;
    if (stateWithValidValue.bankAccountType === "27" && keyList.length === 2)
      return true;
    if (stateWithValidValue.bankAccountType === "26" && keyList.length === 5)
      return true;
    return false;
  };

  const manageStateToSend = () => {
    const notAllowed = ["", null];
    const filtered = Object.keys(formStatePaymentMethod)
      .filter((key) => !notAllowed.includes(formStatePaymentMethod[key]))
      .reduce((obj, key) => {
        obj[key] = formStatePaymentMethod[key];
        return obj;
      }, {});
    const formValidity = getRequiredInfo(filtered);
    if (getAllProperties) return onChange(formStatePaymentMethod, formValidity);
    onChange(filtered, formValidity);
  };

  const handleSelect = (value, name) => {
    const newValue = value ? value.value : null;
    setFormStatePaymentMethod({ ...formStatePaymentMethod, [name]: newValue });
  };

  const handleInput = (value, name) => {
    const newValue = value || null;
    setFormStatePaymentMethod({ ...formStatePaymentMethod, [name]: newValue });
  };

  const handleRadioBtn = (value, name) => {
    setFormStatePaymentMethod({ ...formStatePaymentMethod, [name]: value });
  };

  return (
    <>
      <RadioButtonSection
        name={paymentTexts.names.bankType}
        onChange={(value) => handleRadioBtn(value, paymentTexts.names.bankType)}
        title={paymentTexts.accountTypeTitle}
        options={bankAccountOptions}
      />
      {formStatePaymentMethod.bankAccountType.length ? (
        <TwoColumnsContainer>
          <OutlinedSelectContainer>
            <MaterialSelect
              onChange={(value) => handleSelect(value, paymentTexts.names.bank)}
              name={paymentTexts.names.bank}
              placeholder={paymentTexts.placeholders.bank}
              optionsContainerStyles={{ marginTop: "10px" }}
              selectOptions={
                formStatePaymentMethod.bankAccountType === "27"
                  ? cashPickup
                  : paymentAccountOptions
              }
            />
          </OutlinedSelectContainer>
          {formStatePaymentMethod.bankAccountType === "26" && (
            <>
              <OutlinedSelectContainer>
                <MaterialSelect
                  onChange={(value) =>
                    handleSelect(value, paymentTexts.names.accountType)
                  }
                  name={paymentTexts.names.accountType}
                  placeholder={paymentTexts.placeholders.accountType}
                  optionsContainerStyles={{ marginTop: "10px" }}
                  selectOptions={accountType}
                />
              </OutlinedSelectContainer>
              <MaterialInput
                disabled={
                  !formStatePaymentMethod.accountType ||
                  !formStatePaymentMethod.bank
                }
                register={register(
                  accountNumberValidations(formStatePaymentMethod)
                )}
                onChange={(value) =>
                  handleInput(value, paymentTexts.names.accountNumber)
                }
                name={paymentTexts.names.accountNumber}
                placeholder={paymentTexts.placeholders.accountNumber}
                error={
                  <ErrorHandler
                    noMargin={true}
                    isTouched={touched[paymentTexts.names.accountNumber]}
                    errors={errors}
                    name={paymentTexts.names.accountNumber}
                  />
                }
              />
              <MaterialInput
                disabled={
                  !formStatePaymentMethod.accountType ||
                  !formStatePaymentMethod.bank
                }
                register={register(
                  interbankAccountNumberValidations(isDiferentBank)
                )}
                onChange={(value) =>
                  handleInput(value, paymentTexts.names.interNumber)
                }
                name={paymentTexts.names.interNumber}
                placeholder={paymentTexts.placeholders.interNumber}
                error={
                  <ErrorHandler
                    noMargin={true}
                    isTouched={touched[paymentTexts.names.interNumber]}
                    errors={errors}
                    name={paymentTexts.names.interNumber}
                  />
                }
              />
            </>
          )}
        </TwoColumnsContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default PaymentMethod;
