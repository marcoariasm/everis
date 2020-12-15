import React from 'react';
import styled from 'styled-components';
import $ from 'global/styles';
import LateralMenu from '../components/LateralMenu/LateralMenu';

const MainDashboardLayout = ({ children, lateralMenu }) => (
  <Body>
    <Sidebar>
      <LateralMenu>
        { lateralMenu }
      </LateralMenu>
    </Sidebar>
    <Content>
      <Page>
        {children}
      </Page>
    </Content>
  </Body>
);

export default MainDashboardLayout;

const Body = styled.div`
  display: grid;
  grid-template-columns: 228px 1fr;
  grid-template-rows: auto;
  height: 100vh;
  background: #f7f7f8;
`;

const Sidebar = styled.div`
  background-color: ${$.gris};
  height: calc(100vh - 60px);
`;

const Content = styled.div`
  padding-left: 55px;
  padding-right: 55px;
  padding-top: 30px;
  padding-bottom: 33px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const Page = styled.div`
  // overflow-x: hidden;
`;
