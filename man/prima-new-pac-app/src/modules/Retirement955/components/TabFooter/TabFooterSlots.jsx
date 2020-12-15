import React from 'react';
import styled from 'styled-components';

function LeftSide() {
  return null;
}

function RightSide() {
  return null;
}

class TabFooterSlots extends React.Component {
  static LeftSide = LeftSide;
  static RightSide = RightSide;

  render() {
    const children = Array.isArray(this.props.children) ?
        this.props.children :
        [this.props.children];

    const leftside = children.find(child => child.type === LeftSide);
    const rightside = children.find(child => child.type === RightSide);

    return (
        <Footer id={this.props.id}>
          <leftside>
            {leftside ? leftside.props.children : null}
          </leftside>
          <rightside>
            {rightside ? rightside.props.children : null}
          </rightside>
        </Footer>
    );
  }
}

TabFooterSlots.defaultProps = {
  id: 'tab-footers',
  showBackButton: true,
  showSaveButton: true,
  nextButtonText: 'Siguiente',
  nextButtonSize: 19,
};

export default TabFooterSlots;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 44px 0;
  & > div {
    display: flex;
    justify-content: space-evenly;
    width: 50%;
  }
  
  rightside{
    display: flex;
  }
  
  & rightside > * {
    margin: 0 10px;
  }
`;
