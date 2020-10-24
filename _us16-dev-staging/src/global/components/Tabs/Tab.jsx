import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import checksolo from "shared/images/checksolo.svg";
import { ReactSVG } from "react-svg";
import styled from "styled-components";
import { size } from "shared/styles/Responsive";
import { allColors } from "shared/styles/index";

import "global/components/Tabs/style.sass";

const ContentImageCard = styled.div`
  border-radius: 6px;
  padding: 10px 40px;
  display: grid;
  width: 100%;
  min-height: 4em;
  justify-self: center;
  grid-template-columns: 0.6fr 1fr;
  column-gap: 6%;
  box-shadow 0 4px 8px 1px rgba(53, 53, 53, 0.12);

  @media only screen and (max-width: ${size.tablet}) {
    display: flex;
    justify-content: space-evenly;
    min-height: auto;
    padding: 15px 20px 15px 20px;
    justify-self: left;
    height: 100%;
    &.tab-list-item>div:first-child{
      display: none !important;
    }
    &.tab-list-active{
      background-color: ${allColors.colorGreen};
      border-color: ${allColors.colorGreen};
      >div{
        color: ${allColors.colorWhiteBase};
      }
      >div:first-child{
        display:block !important;
      }
    }
  }
`;
const ImageData = styled.div`
  align-self: flex-start;
  justify-self: center;
  & > img {
    max-width: 80px;
    height: 100%;
    max-height: 80px;
  }
  @media only screen and (max-width: ${size.tablet}) {
    justify-self: left;
  }
`;

const ContentData = styled.div`
  display: grid;
  align-items: center;
  justify-self: center;
  grid-template-rows: auto auto;
  font-family: Calibri;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  color: #696158;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-rows: 1fr;
    justify-self: left;
  }
`;

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    src: PropTypes.any,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, src, onClick } = this.props;
    onClick(label, src);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label, src },
    } = this;

    let className = "tab-list-item";

    if (activeTab === label) {
      className += " tab-list-active";
    }

    return (
      <Link onClick={onClick} to="#">
        <ContentImageCard className={className}>
          <ImageData>
            <ReactSVG src={src ? src : checksolo} alt="New Application 2" />
          </ImageData>
          <ContentData>{label}</ContentData>
        </ContentImageCard>
      </Link>
    );
  }
}

export default Tab;
