import React, {Component, Fragment} from 'react'
import Input from 'global/components/v1/InputMaterial'
import PropTypes from 'prop-types'

import './Autocomplete.sass'

class Autocomplete extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    label: PropTypes.string,
    suggestions: PropTypes.instanceOf(Array),
    valueName: PropTypes.string,
    labelName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Array),
    ]),
  }

  static defaultProps = {
    suggestions: [],
    label: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
    }
  }

  cleanInput = () => {
    this.setState({
      userInput: ''
    })
  }

  getString(value) {
    let suggestionSring = ''

    if (typeof this.props.labelName === 'string') {
      suggestionSring = value[this.props.labelName]
    } else {
      suggestionSring = []
      this.props.labelName.forEach((label) => {
        suggestionSring.push(value[label])
      })

      return suggestionSring.join(' ')
    }
  }

  onChange = e => {
    const {suggestions} = this.props
    const userInput = e.currentTarget.value

    const filteredSuggestions = suggestions.filter(
        (suggestion) => {
          let searchString = this.getString(suggestion)

          return searchString.toLowerCase()
                  .indexOf(userInput.toLowerCase()) >
              -1
        },
    )

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    })
  }

  onClick = (e, suggestion) => {

    const {activeSuggestion} = this.state

    this.props.onSelect(suggestion)

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    })

  }

  onKeyDown = e => {
    const {activeSuggestion, filteredSuggestions} = this.state

    if (e.keyCode === 13) {
      this.props.onSelect(filteredSuggestions[activeSuggestion])

      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: this.getString(filteredSuggestions[activeSuggestion]),
      })
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return
      }

      this.setState({activeSuggestion: activeSuggestion - 1})
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return
      }

      this.setState({activeSuggestion: activeSuggestion + 1})
    }
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
      },
    } = this

    let suggestionsListComponent

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                let className

                if (index === activeSuggestion) {
                  className = 'suggestion-active'
                }

                return (
                    <li
                        className={className}
                        key={suggestion[this.props.valueName]}
                        onClick={(e) => onClick(e, suggestion)}
                    >
                      {this.getString(suggestion)}
                    </li>
                )
              })}
            </ul>
        )
      } else {
        suggestionsListComponent = (
            <div className="no-suggestions">
              <em>No suggestions, you're on your own!</em>
            </div>
        )
      }
    }

    return (
        <Fragment>
          <div className="autocomplete-box" ref={this.props.ref}>
            <Input
                label={this.props.label}
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
                name={this.props.name}
            />
            {suggestionsListComponent}
          </div>
        </Fragment>
    )
  }
}

export default Autocomplete