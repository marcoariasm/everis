import PropTypes from 'prop-types'
import styled from 'styled-components'
import config, { media } from '../../../../constants/styled.config';


const Row = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  ${props => props.bgColor && `background-color:${props.bgColor};`}
  ${props => !props.autoFlex ? `flex: 0 1 auto;`: `flex:1 1 auto;`}


  ${props => props.padding && `padding:${props.padding};`}

  ${props => props.margin ? `margin:${props.margin};`: `
    margin-right: -15px;
    margin-left: -15px;
  `}

  ${props => props.reverse && `
    flex-direction: row-reverse;
  `}
  ${props => props.start && `
    justify-content: flex-start;
  `}
  ${props => props.center && `
    justify-content: center;
  `}
  ${props => props.end && `
    justify-content: flex-end;
  `}
  ${props => props.top && `
    align-items: flex-start;
  `}
  ${props => props.middle && `
    align-items: center;
  `}
  ${props => props.bottom && `
    align-items: flex-end;
  `}
  ${props => props.around && `
    justify-content: space-around;
  `}
  ${props => props.between && `
    justify-content: space-between;
  `}
  ${props => props.first && `
    order: -1;
  `}
  ${props => props.last && `
    order: 1;
  `}


  ${props =>{
        let mqGenerada;
        let resoluciones = Object.keys(props).filter(dim => config.resolutions.includes(dim));
        if(resoluciones.length > 0){
            mqGenerada = resoluciones.map(_dim => {
                if(props[_dim].indexOf(';') > -1){
                  return media[_dim]`${props[_dim]}`;
                }
            })
        }
        return mqGenerada;
      } 
  }
`
Row.propTypes = {
  bgColor:PropTypes.string,
  reverse: PropTypes.bool,
  start: PropTypes.bool,
  center: PropTypes.bool,
  end: PropTypes.bool,
  top: PropTypes.bool,
  middle: PropTypes.bool,
  bottom: PropTypes.bool,
  around: PropTypes.bool,
  between: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
  children: PropTypes.node
}

export default Row