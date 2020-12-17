import React, { useState } from 'react';
import classNames from 'classnames';

import '../Card/Card.sass';
import './CardCollapsible.sass';

import CollapsibleIcon from 'shared/images/iconos/collapse-open.svg';

const CardCollapsible = ({
  className, title, whiteTheme = false, children, footer = false, open = false,
}) => {
  const ID = Math.floor(Math.random() * 10000);

  const [isOpen, setIsOpen] = useState(open);

  return (
    <div className={classNames('card-component', className,
      {
        'with-title': title,
        'white-theme': whiteTheme,
      })}
    >
      <input id={`collapsable-${ID}`} className="toggle" type="checkbox" checked={isOpen} onChange={() => { setIsOpen(!isOpen); }} />
      <label htmlFor={`collapsable-${ID}`} className="label-toggle">
        {title}
        <img src={CollapsibleIcon} alt="Collapsible Icon" />
      </label>
      <div className="collapse-content">
        <div className="collapse-inner">
          {children}
        </div>
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default CardCollapsible;
