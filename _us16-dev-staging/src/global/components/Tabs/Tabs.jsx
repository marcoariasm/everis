import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { size } from 'shared/styles/Responsive'

import Tab from './Tab'

const GridButtons = styled.div`
  display: grid;
  grid-column-gap: 4%;
  margin: 3em 0 2em;
  grid-template-columns: 1fr 1fr;
  @media only screen and (max-width: ${size.tablet}) {
    margin: 20px 0 40px 0;
    grid-row-gap: 6%;
    width: 100%;
  }
`

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      activeTab: this.props.children[0].props.label,
    }
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab })
  }

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this

    return (
      <div className="tabs">
        <GridButtons>
          {children.map((child) => {
            const { label } = child.props
            const { src } = child.props
            return <Tab activeTab={activeTab} key={label} label={label} src={src} onClick={onClickTabItem} />
          })}
        </GridButtons>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined
            return child.props.children
          })}
        </div>
      </div>
    )
  }
}

export default Tabs
