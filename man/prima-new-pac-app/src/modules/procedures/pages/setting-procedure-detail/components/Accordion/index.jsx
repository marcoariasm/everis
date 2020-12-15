import "./styles.scss";
import React, { useEffect, useState } from "react";
import Trash from "shared/images/trash.svg";
import Button from "../../components/Button/Button";
import InputMaterial from "global/components/v1/InputMaterial";

const Documents = ({ labelItem, listGroup, setListGroup, ixGroup }) => {
  const [listDocuments, setListDocuments] = useState([]);
  const [document, setDocument] = useState({ nameDocument: "" });
  
  let copyListGroup = [];
  let copyListDocuments = [];
  let copyGroup = {};

  const addDocument = (indexGroup) => {
    copyListDocuments = [...listDocuments];
    copyListDocuments.push(document);
    setListDocuments(copyListDocuments);

    copyListGroup = [...listGroup];
    copyListGroup.splice(indexGroup, 1, {nameGroup: listGroup[indexGroup].nameGroup, documents:copyListDocuments});
    console.log("agregando -> i=",indexGroup);
    setListGroup(copyListGroup);
  };

  const removeDocument = (ixDoc, ixGroup) => {
    copyListGroup = [...listGroup];
    copyGroup = copyListGroup[ixGroup];
    copyListDocuments = copyGroup.documents;
    copyListDocuments.splice(ixDoc, 1);
    setListDocuments(copyListDocuments);
    copyListGroup.splice(ixGroup, 1, {nameGroup: copyGroup.nameGroup, documents: listDocuments});
    setListGroup(copyListGroup);
    console.log("removiendo grupo, docum -> ", ixGroup, ixDoc);
  };
    
  const handleDocument = (e) => {
    setDocument({ nameDocument: e.target.value });
  };

  useEffect(() => {
    listGroup.map(
      _ => setListDocuments(_.documents)
      )
  },[])

  return (
    <>
      <ul className="list-documents">
        {listDocuments &&
          listDocuments.map((_, ixDoc) => (
            <li key={ixDoc} className="document-container">
              <span>{_.nameDocument}</span>
              <img className="trash" src={Trash} onClick={() => removeDocument(ixDoc, ixGroup)} />
            </li>
          ))}
      </ul>
      <form>
        <InputMaterial
          style={{ maxWidth: "40%"}}
          placeholder={`Nombre de ${labelItem}`}
          onChange={handleDocument}
        />
        <Button
          style={{
            backgroundColor: "#00AE99",
            width: 242,
            color: "white",
            marginTop: 5,
          }}
          disabled={false}
          type={"reset"}
          onClick={() => addDocument(ixGroup)}
        >
          {`Añadir ${labelItem}`}
        </Button>
      </form>
    </>
  );
};

const Group = ({ name, children, disableDefaultStyles, ixGroup }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="group-wrapper">
        <div
          className={`group-title ${isOpen ? "open" : ""}`}
          onClick={() => {setOpen(!isOpen); console.warn("group open ->",ixGroup)}}
        >
          {name}
        </div>
        <div className={`group-item ${!isOpen ? "collapsed" : ""}`}>
          <div
            className={`group-content ${
              disableDefaultStyles ? "" : "body-default-styles"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

const Accordion = ({
  title,
  labelGroup,
  labelItem,
  children,
  listGroup,
  setListGroup,
  hidden,
  disableDefaultStyles
}) => {
  const [group, setGroup] = useState([]);
  // const [listGroup, setListGroup] = useState([]);

  const [isOpen, setOpen] = useState(false);

  let copyListGroup = [];

  const addGroup = () => {
    copyListGroup = [...listGroup];
    copyListGroup.push({ nameGroup: group.nameGroup });
    setListGroup(copyListGroup);
  };

  const removeGroup = (ixGroup) => {
    copyListGroup = [...listGroup];
    console.log("removing group ->",ixGroup);
    delete copyListGroup[ixGroup];
    // copyListGroup.splice(ixGroup, 1);
    setListGroup(copyListGroup);
  };

  const handleGroupName = (e) => {
    setGroup({ nameGroup: e.target.value });
  };

  return (
    <>
      <div className="accordion-wrapper" hidden={hidden}>
        <div
          className={`accordion-title ${isOpen ? "open" : ""}`}
          onClick={() => setOpen(!isOpen)}
        >
          {title}
        </div>
        <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
          <div
            className={`accordion-content ${
              disableDefaultStyles ? "" : "body-default-styles"
            }`}
          >
            {listGroup.length>0 &&
              listGroup.map((_, j) => (
                <div className="group-container">
                  <Group name={_.nameGroup} key={j} ixGroup={j}>
                    <Documents
                      key={j}
                      ixGroup={j}
                      labelItem={labelItem}
                      listGroup={listGroup}
                      setListGroup={setListGroup}
                    />
                  </Group>
                  <div className="trash-group">
                    <img src={Trash} onClick={() => removeGroup(j)} />
                  </div>
                </div>
              ))}

            <div className="button-section">
              <form>
                <InputMaterial
                  placeholder={`Nombre de ${labelGroup}`}
                  style={{ maxWidth: "40%" }}
                  onChange={handleGroupName}
                />
                <Button
                  style={{
                    backgroundColor: "#00AE99",
                    width: 242,
                    color: "white",
                    marginTop: 5,
                  }}
                  disabled={false}
                  type={"reset"}
                  onClick={() => addGroup()}
                >
                  {`Añadir ${labelGroup}`}
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="trash-icon"><img src={Trash} /></div>
      </div>
    </>
  );
};

export default Accordion;