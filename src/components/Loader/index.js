import React from "react"
import "./Loader.css"

function Loader(_props) {
  return (
    <div className="modal">
      <div className="modal_content">
        <h2>Loading...</h2>
        <div className="loader" />
      </div>
    </div>
  )
}
export default Loader
