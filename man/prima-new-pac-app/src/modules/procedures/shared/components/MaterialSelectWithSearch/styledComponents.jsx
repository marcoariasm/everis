import styled from 'styled-components';

export const SelectButton = styled.div`
  width: ${props => props.width || '100%'};
`;

export const ButtonLabel = styled.div`
  flex: 5;
  font-family: ${props => props.fontFamily};
  display: flex;
  align-items: center;
  font-size: 14px;
  overflow: hidden;
  justify-content: flex-start;
  color: ${props => props.isPlaceholder ? '#9d9994' : '#696158'};
`;

export const Arrow = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OptionItem = styled.li`
  color: ${props => {
    if (props.isPlaceholder) return '#C2C2C2';
    if (props.isActive) return '#FF4F00';
    return '#696158';
  }};
  border-top: 0.3px solid #f6f6f6;
`;

export const Label = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Input = styled.input`
  background-image: ${({ icon }) => `url(${icon})`} !important;
  background-position: 96% center !important;
  background-size: 18px 18px !important;
  background-repeat: no-repeat !important;
`;
