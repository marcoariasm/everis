import PropTypes from 'prop-types';
import styled from 'styled-components';
import config, { media } from '../../../../constants/styled.config';

const createMediaQueries = config.resolutions.map(size => {
  let mquery = media[size]
      `
        max-width: ${config.containerMaxWidth [size]}px;
        padding: 0 1rem;
      `;
  return mquery;
});

const Container = styled.div`
  width:100%;

  ${props => props.bgColor && `background-color:${props.bgColor};`}
  ${props => props.center && `text-align:center;`}
  ${props => !props.margin ?
    `
      margin-left: auto;
      margin-right: auto;
    `:
    `
      margin: ${props.margin};
    `
  }

  ${props => !props.padding ?
    `
      padding-right: ${config.paddingDefault}rem;
      padding-left: ${config.paddingDefault}rem;
    `:
    `
      padding: ${props.padding};
    `
  }

  ${props => props.flexbox && `display:flex;`}

  ${props => (props.type === 'fluid') &&
    `
    padding-right: ${config.paddingFluidDefault}rem;
    padding-left: ${config.paddingFluidDefault}rem;
  `}


   ${props => (props.type === 'full') &&
    `
    padding-right: 0rem;
    padding-left: 0rem;
  `}

  ${({borderRadius})=> borderRadius && `border-radius: ${borderRadius};`}


  ${props => !props.type && createMediaQueries}

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

`;

Container.propTypes = {
  bgColor:PropTypes.string,
  type: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  children: PropTypes.node,
  center: PropTypes.bool
};

export default Container;