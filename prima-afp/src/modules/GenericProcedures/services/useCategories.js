import React from 'react'
import useHttp from 'modules/shared/api/useHttp';

function useCategories () {
  const url = `${process.env.REACT_APP_APPLICANT_API}/procedure/type/v1/category`;
  return useHttp(url)
} 

export default useCategories;