import React from 'react';
import classNames from 'classnames';

import './Card.sass';

class Card extends React.Component {
  render() {
    return (
      <div className={classNames('card-component', this.props.className,
        {
          'with-title': this.props.title,
          'white-theme': this.props.whiteTheme,
        })}
      >
        {this.props.title && (
          <div className="card-header">
            {this.props.title}
          </div>
        )}
        <div className="card-body">
          {this.props.children}
        </div>
        {this.props.footer && (
          <div className="card-footer">
            {this.props.footer}
          </div>
        )}
      </div>
    );
  }
}

export default Card;
