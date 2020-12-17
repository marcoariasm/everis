import React, { Children, Fragment } from 'react';
import styled from 'styled-components';
import $ from 'global/styles';

const Tab = ({ children, step }) => {
  const chidrenArray = Children.toArray(children);

  const listSteps = () =>
    // eslint-disable-next-line no-empty-pattern
    chidrenArray.map(({}, i) => (
      <Fragment key={i}>
        <ItemStep size={chidrenArray.length} index={i - 1} step={step} equal={step === i}>
          <ItemStepValue index={i - 1} step={step}>{i + 1}</ItemStepValue>
        </ItemStep>
        {chidrenArray.length - 1 !== i && <Bar index={i} step={step} />}
      </Fragment>
    ));

  return (
    <Wrapper>
      <Steps size={chidrenArray.length}>
        {listSteps()}
      </Steps>
      <Content>
        {chidrenArray[step]}
      </Content>
    </Wrapper>
  );
};

export default Tab;

const Wrapper = styled.div`
  margin-top: 20px;
`;

const Steps = styled.div`
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => (props.size === 2 ? '178px' : `${props.size * 100}px`)};
`;

const ItemStepValue = styled.div`
  width: 41.5px;
  height: 41.5px;
  background-color: ${(props) => (props.step > props.index ? $.verde : $.grisDisabled)};
  color: ${$.blanco};
  line-height: 44px;
  text-align: center;
  border-radius: 50%;
  font-weight: bold;
  font-size: 21.3843px;
  transition: .4s;
  font-family: FS Emeric;
`;

const ItemStep = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ equal, size }) => (equal ? size <= 3 ? '55px' : `${44 + (size * 4)}px` : 'none')};
  height: 54px;
  border: ${(props) => (props.equal ? `2px solid ${$.verde}` : 'none')};
  border-radius: 50%;
  box-shadow: ${(props) => (props.equal ? ' 2.44392px 2.44392px 3.0549px rgba(121, 121, 121, 0.4)' : 'none')};
  transition: .4s;
`;

const Bar = styled.div`
  background-color: ${(props) => (props.step > props.index ? $.verde : $.grisDisabled)};
  width: 82px;
  height: 10px;
  transition: .4s;
`;

const Content = styled.div`
  padding: 30px 0px;
`;
