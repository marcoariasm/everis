import useHttp from 'modules/shared/api/useHttp';

const useProcedureInformation = (id) => {
  const url = `${process.env.REACT_APP_APPLICANT_API}/procedure/type/v1/${id}/configuration/`;
  return useHttp(url)
} 

export default useProcedureInformation;