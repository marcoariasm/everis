import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ReactSVG } from 'react-svg'

import 'global/components/v1/Tabs/style.sass'

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    src: PropTypes.any,
    onClick: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { label, src, onClick } = this.props
    onClick(label, src)
  }

  render() {
    const {
      onClick,
      props: { activeTab, label, src },
    } = this

    let className = 'tab-list-item'

    if (activeTab === label) {
      className += ' tab-list-active'
    }

    return (
      <div className={className} onClick={onClick}>
        <ReactSVG src={src} />
        <p>{label}</p>
      </div>
    )
  }
}

export default Tab
