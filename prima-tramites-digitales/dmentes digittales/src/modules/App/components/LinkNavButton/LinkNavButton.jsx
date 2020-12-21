import React from "react"
import classNames from "classnames"
import {Link, useHistory, useLocation} from "react-router-dom"
import Option from "./Option"
import { isNil, isEmpty } from 'ramda'
import {useModalConfirmLeave} from "../../contexts/ModalConfirmLeaveContext"

const LinkNavButton = ({ path, icon, iconActive, text, pathLink, holdContent }) => {
  const { setHoldNavigation, setConfirmContent, interceptorHoldNavigation } = useModalConfirmLeave()
  const { pathname } = useLocation()
  const history = useHistory()
  const isCurrentLocation = (navPath) => pathname.includes(navPath);
  const goTo = isNil(pathLink) ? path : pathLink;

  const onClickLink = (event) => {
    event.preventDefault()
    setConfirmContent(holdContent)
    interceptorHoldNavigation(() => {
      history.push(pathLink)
      setHoldNavigation(false)
    })
  };

  const getLink = () => {
    return isEmpty(holdContent) && !isNil(holdContent) ? (
      <Link to={goTo}>
        <Option texto={text} icon={isCurrentLocation(path) ? icon : iconActive} />
      </Link>
    ) : (
      <a onClick={onClickLink}>
        <Option texto={text} />
      </a>
    );
  };

  return (
    <div className={classNames('option-menu', { active: isCurrentLocation(path) })}>
      { getLink() }
    </div>
  );
};

export default LinkNavButton;