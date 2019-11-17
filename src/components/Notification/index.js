import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import "./Notification.css"

class Notification extends Component {
  state = {
    hidden: false
  }

  static propTypes = {
    error: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
    if (this.decoratedErrorMessage(prevProps) !== this.decoratedErrorMessage(this.props) && this.state.hidden) {
      this.setState({ hidden: false })
    } else if (!this.state.hidden) {
      setTimeout(this.setState.bind(this), 5000, { hidden: true })
    }
  }

  decoratedErrorMessage = ({ error }) => {
    return Object.entries(error).reduce((stringErrors, [name, errors]) => {
      return name === 'base' ? [...stringErrors, errors] : [...stringErrors, `${name} ${errors.join(",")}`]
    }, []).join(",")
  }

  render() {
    const message = this.decoratedErrorMessage(this.props)
    const { hidden } = this.state

    if (!message || hidden) return null

    return(
      <div className="notification__container">
        <div className="notification notification--red">
          <p className="notification__message">{ message }</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return { error: user.error }
}

export default connect(mapStateToProps)(Notification)
