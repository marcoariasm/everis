import PropTypes from 'prop-types'
import styled from 'styled-components'
import config, { media } from '../../../../constants/styled.config';



const ModificatorType = PropTypes.oneOfType([PropTypes.number, PropTypes.bool, PropTypes.string])
const offsetProps = config.resolutions.map(d => d + 'Offset')
const DimensionPropTypes = config.resolutions.reduce((propTypes, dimension) => {
    propTypes[dimension] = ModificatorType
    propTypes[dimension + 'Offset'] = PropTypes.number
    return propTypes
  }, {})
  
  
const Col = styled.div`
  box-sizing: border-box;
  flex: 0 0 auto;

  ${props => props.bgColor && `background-color:${props.bgColor};`}

  ${props => props.padding ? `padding:${props.padding};`: `
    padding-right: 15px;
    padding-left: 15px;
  `}

  ${props => props.reverse && `
    flex-direction: column-reverse;
  `}

  ${
      props =>{
        let mqGenerada;
        let resoluciones = Object.keys(props).filter(dim => config.resolutions.includes(dim));
        if(resoluciones.length > 0){
            mqGenerada = resoluciones.map(_dim => {
                if(typeof(props[_dim]) === "number"){
                    return media[_dim]`
                        flex-basis: ${100 / config.gridSize * props[_dim]}%;
                        max-width: ${100 / config.gridSize * props[_dim]}%;
                        display: block;
                    `
                }else{
                   if(props[_dim] === 'hide'){ 
                    return media[_dim]`
                         display: none;
                     `
                   }else
                   if(props[_dim].indexOf(';') > -1){
                      return media[_dim]`${props[_dim]}`;
                   }else{ 
                     return media[_dim]`
                         flex-basis: ${props[_dim]};
                         max-width: ${props[_dim]};
                         display: block;
                     `
                   }
                }
            })
        }else{
            mqGenerada = `
                flex-grow: 1;
                flex-basis: 0;
                max-width: 100%;
                display: block;
            `
        }
        return mqGenerada;
      } 
  }


  ${props => Object.keys(props).filter(k => ~offsetProps.indexOf(k)).map(k =>
      media[k.replace(/Offset$/, '')]`
        margin-left: ${100 / config.gridSize * props[k]}%;
      `
    )
  }

  
  ${props=> props.flexStart && `
    display: flex !important;
    justify-content: flex-start;
  `}

  ${props=> props.flexCenter && `
    display: flex !important;
    justify-content: center;
  `}

  ${props=> props.flexEnd && `
    display: flex !important;
    justify-content: flex-end;
  `}


  ${props=> props.flexAlignStart && `
    display: flex !important;
    align-items: flex-start;
  `}

  ${props=> props.flexAlignCenter && `
    display: flex !important;
    align-items: center;
  `}

  ${props=> props.flexAlignEnd && `
    display: flex !important;
    align-items: flex-end;
  `}

  ${props=> props.margin && `
     margin: ${props.margin};
  `}
`;

Col.propTypes = {
  ...DimensionPropTypes,
  bgColor:PropTypes.string,
  reverse: PropTypes.bool,
  flexEnd:PropTypes.bool,
  flexStart:PropTypes.bool,
  flexCenter:PropTypes.bool,
  children: PropTypes.node
}

export default Col