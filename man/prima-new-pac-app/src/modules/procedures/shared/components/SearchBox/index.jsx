import React, { useState } from 'react';
import styled from 'styled-components';
import $ from 'global/styles';
import lupa from 'shared/images/iconos/lupa.svg';

const Container = styled.div`
    margin: 30px auto;
    border: solid 1px ${$.colorGrayBorder};
    border-radius: 8px;
    height: 40px;
    > input {
        margin: 4px 0 0 4px;
        padding: 9px 9px;
        opacity: 1;
        z-index: 1;
        font-size: 14px;
        height: 30px;
        width: 95%;
        position: relative;
        border: none;
        outline: none;
        color: ${$.colorGrayText};
    }
    > img {
        align-items: center;
        max-height: 25px;
        float: right;

    }
`;

const Card = styled.div`
    border-radius: 6px;
    box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
    border: solid 1px #e8e8e8;
    background-color: #ffffff;
    margin-bottom: 20px;
    padding: 10px 10px;
    > ul {
    }
`;

const Filter = ({ value, handleChange }) => (
  <Container>
    <input
      type="text"
      placeholder="Buscar trámites"
      value={value}
      onChange={handleChange}
    />
    <img src={lupa} alt="Buscar" />
  </Container>
);

const ListResults = ({ isList, list, children }) => (
  <div hidden>
    <Card>
      {/* { isList ?
                // <ul>
                //     {list.map(element => <li>{element}</li>)}
                // </ul>
                <BulletedList2 textList = {list} />

                :children } */}
    </Card>
  </div>
);

const SearchBox = () => {
  const [word, setWord] = useState('');
  const [list] = useState([
    {
      name: 'alpha',
      link: '#',
    },
    {
      name: 'beta',
      link: '#',
    },
    {
      name: 'gamma',
      link: '#',
    },
  ]);

  const [filterDisplay, setFilterDisplay] = useState([]);

  const handleChange = (e) => {
    setWord(e);
    const oldList = list.map((elem) => elem.toLowerCase());
    if (word !== '') {
      let newList = [];
      newList = oldList.filter((elem) => elem.includes(word.toLowerCase()));
      setFilterDisplay(newList);
    } else {
      setFilterDisplay(list);
    }
  };

  return (
    <>
      <Filter value={word} handleChange={(e) => handleChange(e.target.value)} />
      <ListResults isList list={word.length < 1 ? list : filterDisplay} />
    </>
  );
};

export default SearchBox;
