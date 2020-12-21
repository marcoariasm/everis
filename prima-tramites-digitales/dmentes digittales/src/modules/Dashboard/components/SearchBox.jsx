import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { allColors } from "global/styles/index";
import lupa from "shared/images/lupa.svg";

const Container = styled.div`
  margin: 30px auto;
  border: solid 1px ${allColors.colorGrayBorder};
  border-radius: 8px;
  display: flex;
  align-items: center;
  > input {
    margin: 4px 0 0 4px;
    padding: 9px 0px 9px 22px;
    font-size: 14px;
    height: 40px;
    width: 95%;
    position: relative;
    border: none;
    outline: none;
    color: ${allColors.colorGrayText};
  }
  > img {
    align-items: center;
    max-height: 25px;
    margin-right: 22px;
  }
`;

const Card = styled.div`
  border-radius: 6px;
  box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
  border: solid 1px #e8e8e8;
  background-color: ${allColors.colorWhiteBase};
  margin-bottom: 15px;
  color: ${allColors.colorGrayText};
  font-family: calibri;
  font-size: 14px;
  > ul {
    padding: 10px 10px;

    li {
      padding: 3px 0;
      cursor: pointer;
    }
  }
`;

const Filter = ({ value, handleChange }) => {
  return (
    <Container>
      <input
        type="text"
        placeholder={"Buscar trámites"}
        value={value}
        onChange={handleChange}
      />
      <img src={lupa} alt="Buscar" />
    </Container>
  );
};

const ListResults = ({ list, found = false, selectItem }) => {
  return (
    <div hidden={false}>
      {found ? (
        <Card>
          <ul>
            {list.map((element, i) => (
              <li key={i} onClick={() => selectItem(element)}>
                {element.name}
              </li>
            ))}
          </ul>
        </Card>
      ): ''}
    </div>
  );
};

const SearchBox = ({ categories }) => {
  const [word, setWord] = useState("");
  const [filterDisplay, setFilterDisplay] = useState([]);
  const [category, setCategory] = useState([]);
  const history = useHistory();

  const makeList = (object) => {
    let list = [];
    object
      .filter((_) => _.typeRequests.length > 0)
      .forEach((_) => {
        list = [...list, ..._.typeRequests];
      });
    return list;
  };

  useEffect(() => {
    if (categories) {
      setCategory(categories);
    }
  }, [categories]);

  const handleChange = (e) => {
    setWord(e);
    const auxList = Object.assign([], lista);
    setFilterDisplay(
      word
        ? auxList.filter(
            (_) => _.name.toLowerCase().indexOf(word.toLowerCase()) !== -1
          )
        : lista
    );
  };
  const [...lista] = makeList(category);
  const [list] = useState(lista);

  return (
    <>
      <Filter value={word} handleChange={(e) => handleChange(e.target.value)} />
      <ListResults
        list={word.length === 0 ? list : filterDisplay}
        found={word.length}
        selectItem={(e) =>
          history.push(`/nueva-solicitud/tramite/${e.idTypeRequest}`)
        }
      />
    </>
  );
};

export default SearchBox;
