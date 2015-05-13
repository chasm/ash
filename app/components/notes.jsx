import React from "react"
import Note from "./note"

export default class Notes extends React.Component {
  render () {
    let notes = this.props.items

    return <ul className="notes">{notes.map((note, i) =>
      <li className="note" key={"note" + i}>
        <Note
          task={note.task}
          onEdit={this.props.onEdit.bind(this, i)} />
      </li>
    )}</ul>
  }
}
