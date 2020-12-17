import React from 'react';
import SharedModule from 'modules/shared';
import styled from 'styled-components';
import {
  map, join, pipe, ifElse, always, has,toLower, split, head, prop, toUpper,
} from 'ramda';
import UserMenu from '../../assets/images/userIcon.svg';

const capitalize = (word) => toUpper(word.charAt(0)) + toLower(word).slice(1);
const capitalizePhrase = pipe(split(' '), map(capitalize), join(' '));

const SessionInfoStyled = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 40px;
    padding: 0 30px;
    justify-content: space-between;
    align-items: center;
`;

const SessionNameStyled = styled.span`
    font-family: FS Emeric, sans-serif;
    font-size: 18px;
    line-height: 20px;
    color: white;
    margin-left: 15px;
`;

const { useMe } = SharedModule.hooks;

const SessionInfo = () => {
  const { advisor } = useMe();

  const getFirstName = pipe(split(' '), head);
  const concatNames = (first, second) => (source) => `${first(source)} ${second(source)}`;

  const getSessionName = ifElse(
    has('names'),
    pipe(
      concatNames(
        pipe(prop('names'), getFirstName, capitalizePhrase),
        pipe(prop('lastnames'), capitalizePhrase),
      ),
      (fullName) => (<SessionNameStyled>{ fullName }</SessionNameStyled>),
    ),
    always(''),
  );

  return (
    <SessionInfoStyled>
      <img src={UserMenu} alt="User Menu" />
      { getSessionName(advisor) }
    </SessionInfoStyled>
  );
};

export default SessionInfo;
