import './styles.scss';
import React from 'react';
import StepSections, { AccordionItemTitle } from './components/StepSections';
import BulletedList from './components/BulletedList';

export const DoubleLabel = ({ title, subtitle }) => (
  <div>
    <p className="informationFooterText">{title}</p>
    <p className="titleFooter">{subtitle}</p>
  </div>
);

const AccordionContainer = ({ title, labelComponent, children, disableDefaultStyles }) => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <div className="accordion-wrapper">
      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
        >
        {title || labelComponent}
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className={`accordion-content ${ disableDefaultStyles ? '' : 'body-default-styles'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionContainer;
export { StepSections, BulletedList, AccordionItemTitle };