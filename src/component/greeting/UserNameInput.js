import React from 'react';
import ContentEditable from 'react-contenteditable'

export default class UserNameInput extends React.Component {
  constructor() {
    super()

    this.LS_KEY = 'username'
    this.randomName = ['lovely', 'good looking', 'sexy', 'rockstar', 'gorgeous', 'friends', 'pal', 'superstar']
    this.state = {
      disabledInput: true,
    }
    this.isEditing = false
    this.enteredName = ''
    this._handleChange = this._handleChange.bind(this)
    this._handleDoubleClick = this._handleDoubleClick.bind(this)
    this._handleKeyPress = this._handleKeyPress.bind(this)
    this._handleBlur = this._handleBlur.bind(this)
  }

  componentWillMount() {
    const currentUser = localStorage.getItem(this.LS_KEY)
    let userName

    if (currentUser === null) {
      userName = this.randomName[Math.floor(Math.random() * this.randomName.length)];
    } else {
      userName = currentUser;
      this.enteredName = userName
    }

    this.setState({
      userName
    })
  }

  componentDidUpdate() {
    if (this.isEditing) {
      const el = document.querySelector('.greeting .name')
      if (!this.state.disabledInput) {
        el.setEndOfContenteditable()
      }
      el.animateCss('pulse')
      this.isEditing = false
    }
  }

  _enterUserName = () => {
    const trim = this.state.userName.replace(/\s/gi, '')
    if (!trim.length || trim === this.enteredName) {
      this.setState({
        userName: this.enteredName,
        disabledInput: true
      })
    } else {
      this.enteredName = this.state.userName
      localStorage.setItem(this.LS_KEY, this.state.userName)
      this.setState({
        disabledInput: true
      })
    }
  }

  _handleChange = (e) => {
    this.setState({
      userName: e.target.value
    })
  }

  _handleDoubleClick = () => {
    if (this.state.disabledInput) {
      this.isEditing = true
    }
    this.setState({
      disabledInput: false
    })
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.isEditing = true
      this._enterUserName()
    }
  }

  _handleBlur = () => {
    this.isEditing = true
    this._enterUserName()
  }

  render() {
    return (
      <span className="name-wrapper">
        <ContentEditable
          ref="userNameInput"
          html={this.state.userName}
          disabled={this.state.disabledInput}
          onChange={this._handleChange}
          onDoubleClick={this._handleDoubleClick}
          onKeyPress={this._handleKeyPress}
          onBlur={this._handleBlur}
          spellCheck={false}
          className={"name " + (this.state.disabledInput ? "" : "editing")}
        />
        <span className="punctuation">.</span>
      </span>
    )
  }
}
