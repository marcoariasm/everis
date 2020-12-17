import React from 'react';
import { propOr } from 'ramda';
import { toCamelCase } from 'modules/shared/helpers/HelperForm';
import useApplicant from 'modules/shared/api/useApplicant';

const useApplicantInfo = () => {
  const { applicant } = useApplicant();
  const getFromApplicant = (field) => propOr('', field, applicant);
  const name = toCamelCase(`${getFromApplicant(`firstName`)} ${getFromApplicant(`fatherLastname`)}`);
 
  let usertype = '';
  const cuspp = getFromApplicant('idAffiliate');
  const idApplicant = getFromApplicant('idApplicant')
 
  if(!idApplicant) {
    usertype = 'affiliate';
  } else {
    usertype = 'applicant';
  }
  return {
    name,
    usertype,
    cuspp,
    ...applicant
  }
}


const useUserInfo = () => {
  let userInfo = {name: ''};
  const userApplicant = useApplicantInfo();
  userInfo = userApplicant;
  return userInfo;
}

export default useUserInfo;
