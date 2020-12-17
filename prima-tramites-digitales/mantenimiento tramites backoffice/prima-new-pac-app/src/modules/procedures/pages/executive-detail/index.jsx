import React,{ useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import CardHeader from "./components/CardHeader/index";
import CardBody from "./components/CardBody/index";
import {getExecutive,updateExecutive} from "./services";

import Modal from "global/components/v1/Modal/Modal";
import { ModalBase } from "modules/procedures/shared/components";

const ExecutiveManagment = styled.div`
  width: 80vw;
  min-height: 100vh;
  border-radius: 14px;
  box-shadow: 0 2px 40px 1px rgba(103, 103, 103, 0.12);
  background-color: #ffffff;
  box-sizing: content-box;
  padding-top: 40px;
  border-radius: 5px;
`;

const BotonPrev = styled.span`
  margin-left: 90px;
  font-weight: bold;
  color: #ff4f00;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 29px;
`;
const ContainerButtonSave = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px 87px 10px;
`;
const ButtonSave = styled.button`
  font-family: Calibri;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  width: 216px;
  height: 44px;
  border-radius: 4px;
  background-color: #ff4f00;
  color: #ffffff;
`;
const ModalBody=styled.div`
  display:flex;
  justify-content:center;
`


const DetailExecutive = () => {
  const [executiveDetail, setExecutiveDetail] = useState([]);
 
  const [loading, setLoading] = useState(true);
  const [requestData, setRequestData] = useState(null);


  const [listTypesData, setListTypesData] = useState(executiveDetail.executeTypes);
  const [capacityData, setCapacityData] = useState(executiveDetail.capacity);
  const [activeData, setActiveData] = useState(executiveDetail.active);
  const [isSending, setIsSending] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [update,setUpdate]=useState();

  const history = useHistory();
 
  const handleShowModal = () => {
    setShowModal(true);
  };


  const handlePrev = () => { 
    history.goBack();
  };
  let {id}=useParams();

  useEffect(() => {
    
    if(loading){
      getExecutive(id).then((response)=>{
        setExecutiveDetail(response);
        setLoading(false);
      }).catch((error)=>{
        console.log(error);
        alert(error);
       })
    }
 
  }, [executiveDetail]);

  useEffect(()=>{
    
    if(!isSending ){
      updateExecutive(id,requestData).then((response)=>{
           setIsSending(true); 
           setUpdate(response);
           handleShowModal();
      }).catch((error)=>{
        setUpdate(false);
        console.log(error);
      })
    }
  },[requestData]);

  const getValues=()=>{
    setIsSending(false);
    setRequestData( formatRequest(activeData,capacityData,listTypesData) );
  }

  const formatRequest=(activedRequest,capactyRequest,listRequest)=>{
    return {
      "active":activedRequest,
      "capacity":capactyRequest,
      "typeRequests":listRequest
    };
  }

  const handleHideModal =()=>{

    setShowModal(false);
    setIsSending(false);
  }
  const executiveName = `${executiveDetail.names} ${executiveDetail.lastNames}`;

  return (
    <div>
    {!loading&&
    <>
    <ExecutiveManagment>
      <BotonPrev onClick={handlePrev}> &#60; Volver a la lista</BotonPrev>
      <Card>
        <CardHeader
          name={executiveName}
          rol="Perfil Ejecutivo(a)"
          status={executiveDetail.active}
          sendStatus={setActiveData}
        ></CardHeader>
      </Card>
      <Card>
        <CardBody
         executiveDetail={executiveDetail}
         sendList={setListTypesData}
         sendCapacity={setCapacityData}
        ></CardBody>
      </Card>
      <ContainerButtonSave>
        <ButtonSave onClick={getValues}>Guardar Cambios</ButtonSave>
      </ContainerButtonSave>
      <Modal
        show={showModal}
        onClose={()=>handleHideModal}
        nameButton="Aceptar"
        hideButtonCancel
        justifyContent="space-around"
        onClick={handleHideModal}
        onButtonClick={handleHideModal}
      >
            <ModalBody>
               {update&&
                <div>
                  {  (update)?
                  <p>Se realizo la actualización correctamente</p>:
                  <p>Ups hubo un problema al actualizar</p>
                  } 
                </div>
               }
            </ModalBody>
      </Modal>
    </ExecutiveManagment>
  </>    
    }
    </div>
  );
};

export default DetailExecutive;
