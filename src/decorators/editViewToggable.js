import React, { Component } from 'react'

export default (OriginalComponent) => class EditViewToggable extends Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (ev) => {
    const { currentEditView } = this.state
    const newEditViewValue = ev.target.closest(".edit-view-toggable") ? true : false
    if (currentEditView === newEditViewValue) return

    this.setState({ editView: newEditViewValue })
  }

  state = {
    editView: false
  }

  render() {
    return (
      <div className="edit-view-toggable">
        <OriginalComponent {...this.props} {...this.state} />
      </div>
    )
  }
}
