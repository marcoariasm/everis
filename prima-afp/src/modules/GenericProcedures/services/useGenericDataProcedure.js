import useHttp from 'modules/shared/api/useHttp';

function useGenericDataProcedure(idRequest) {
  const url = `${process.env.REACT_APP_APPLICANT_API}/procedure/v1/generic/${idRequest}`;
  return useHttp(url)
} 

export default useGenericDataProcedure;