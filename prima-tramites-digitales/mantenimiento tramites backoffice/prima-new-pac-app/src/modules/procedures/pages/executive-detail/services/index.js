
import ServiceFetcher from "modules/shared/libs/ServiceFetcher";

export const updateExecutive=(id,data)=>{
    return ServiceFetcher(
      `${process.env.REACT_APP_API_PROCEDURES}/executive/v1/${id}`,
      {
        method:"PUT",
        body:data
      }
    )
};

export const getRequest=()=>{
  return ServiceFetcher(
    `${process.env.REACT_APP_API_PROCEDURES}/procedure/type/v1`,
    {
      methdo:"GET"
    }
  )
}


export const getExecutive=(id)=>{
    return ServiceFetcher(
      `${process.env.REACT_APP_API_PROCEDURES}/executive/v1/${id}`,
      {
        method:"GET",
     
      }
    )
};