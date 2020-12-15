import React ,{useState,useEffect} from "react";
import styled from "styled-components";
import {formatCombo} from 'modules/procedures/constants/formatCombo';
import ButtonImage from "global/components/v1/ButtonImagen/ButtonImage";
import TrashIconEnabled from "shared/images/iconos/borrar2.svg";
import TrashIconDisabled from "shared/images/iconos/borrar3.svg";
import {
  MaterialSelect,
  OutlinedSelectContainer,
} from "modules/procedures/shared/components/index";
import {getRequest} from "./../../services/index";
import { set } from "ramda";
import './cardBody.scss';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 68vw;
  min-height: 400px;
  border-radius: 6px;
  box-shadow: 0 4px 8px 1px rgba(103, 103, 103, 0.12);
  background-color: #ffffff;
`;

const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 42px;
  margin-left: 37px;
  margin-bottom: 25px;
`;

const Title = styled.span`
  color: #00ae99;
  font-family: FS Emeric;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 12px;
`;

const DetailCount = styled.div`
  display: flex;
  align-items: center;
  & > label {
    color: #696158;
    font-size: 14px;
    margin-right: 10px;
  }
  & input {
    width: 77px;
    height: 48px;
    border-radius: 8px;
    border: solid 1px #d6d6d6;
    background-color: #ffffff;
    text-align: center;
  }
`;

const CardSpecialization = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 37px;
  min-width: 800px;
`;

const ButtonAdd = styled.button`
  width: 224px;
  height: 36px;
  border-radius: 6px;
  border: solid 1.4px #00a499;
  background-color: #ffffff;
  color: #00a499;
  margin-bottom: 20px;

`;
const ContainerList = styled.div`
  margin-bottom: 5px;
 
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 45vw;
  margin-bottom: 22px;
`;



const CardBody = ({executiveDetail,sendList,sendCapacity}) => {
 
  const [information,setinformation]=useState(executiveDetail);
  const [list,setList]=useState([]);
  
  const [listTypeRequest,setListTypeRequest]=useState(information.executeTypes);
  const [listTypeRequestTemp,setListTypeRequestTemp]=useState(information.executeTypes);
  const [capacity, setCapacity] = useState(information.capacity);

  useEffect((()=>{
    
      if(list.length==0 ){
        getRequest().then((response)=>{                   
         setList(response);  
        }).catch((error)=>{
          console.log(error);
          alert(error);
         })
      }else{
          let arrayTemp=listTypeRequest.map(e=>e.idTypeRequest);
          const listTemp= list.filter(element=>!arrayTemp.includes(element.idTypeRequest));
          setList(listTemp);  
      }
      
      
   }),[listTypeRequest]);

   const handleAddSpecialization=()=>{ 
   let count =listTypeRequest.filter(e=>e.idTypeRequest==0).length;
   
      if(count<1){
        const clone=[...listTypeRequest,{idTypeRequest: 0, active: "1"}];
        setListTypeRequest(clone);
        setListTypeRequestTemp(clone);
      } 

   }

    const handleDelteSpecialization=(ix)=>{
      let index=listTypeRequest.findIndex(({idTypeRequest})=>idTypeRequest===ix);
      console.log(index,"index");
      let listTypeTemp= listTypeRequest.filter((element)=>element.idTypeRequest!=ix);       
       setListTypeRequest(listTypeTemp);
       let clone=[...listTypeRequestTemp];
       clone[index].active="0";
       setListTypeRequestTemp(clone);

    }


    const handleChangeSpecialization=(event)=>{

      if(event){
        let index=listTypeRequest.length-1;
        let clone=[...listTypeRequest];
        clone[index].idTypeRequest=event.value;   
        setListTypeRequest(clone);
        setListTypeRequestTemp(clone);
      }
        
    }

    useEffect(() => {
      sendList(listTypeRequestTemp);
    }, [listTypeRequestTemp])

    useEffect(() => {
      sendCapacity(capacity);
    }, [capacity])
 


  return (
    <Content>
      <Content>
        <CardTop>
          <Title>Equipo</Title>
          <DetailCount>
            <label>Cantidad:</label>
            <input onChange={(e) => setCapacity(e.target.value)} type="text" placeholder={capacity} />
          </DetailCount>
        </CardTop>
        <CardSpecialization>
          <Title>Especializacion</Title>
          <ContainerList >
           { (listTypeRequest.length >0)&&
           listTypeRequest.map((data,index) => (
            
          <Container key={data.idTypeRequest}>                           
                  {
                  ( (list.length>0)  &&   
                  <OutlinedSelectContainer>
                  <MaterialSelect
                    fontFamily={"FS Emeric"}
                    selectWidth="100%"
                    selectOptions={ formatCombo(list)}
                    placeholder="Seleccionar"
                    initialValue={data.idTypeRequest}
                    onChange={(event)=>handleChangeSpecialization(event)}
                    disabled={listTypeRequest.length-1===index?false:true}
                  />
                  </OutlinedSelectContainer> )
                  }
                  <ButtonImage
                  bcolor="#fff"
                  color='#696158'
                  width="35px"
                  onClick={()=>handleDelteSpecialization(data.idTypeRequest)}
                  icon={ TrashIconEnabled}
                  />
                  </Container>
            ))} 
          </ContainerList>
          <ButtonAdd onClick={handleAddSpecialization}>
            +Añadir especialización
          </ButtonAdd>
        </CardSpecialization>
      </Content>
    </Content>
  );
};

export default CardBody;
