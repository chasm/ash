import React from "react"
import Notes from "./notes"
import NoteActions from "../actions/note"
import NoteStore from "../stores/note"

import connect from "../decorators/connect"
import persist from "../decorators/persist"
import storage from "../libs/storage"

@persist(NoteActions.init, NoteStore, storage, "notes")
@connect(NoteStore)
export default class App extends React.Component {

  constructor (props) {
    super(props)
  }

  addItem () {
    NoteActions.create("New task")
  }

  itemEdited(id, task) {
    if (task) {
      NoteActions.update(id, task)
    } else {
      NoteActions.remove(id)
    }
  }

  render () {
    let notes = this.state.notes

    return <div>
      <button onClick={this.addItem.bind(this)}>+</button>
      <Notes
        items={notes}
        onEdit={this.itemEdited.bind(this)} />
    </div>
  }
}
