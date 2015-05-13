import React from "react"

export default class Note extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      edited: false
    }
  }

  edit () {
    this.setState({ edited: true })
  }

  checkEnter (e) {
    if (e.key === "Enter") {
      this.finishEdit(e)
    }
  }

  finishEdit (e) {
    this.props.onEdit(e.target.value)

    this.setState({ edited: false })
  }

  render () {
    let edited = this.state.edited
    let task = this. props.task

    return <div>{
      edited ?
        <input type="text"
          defaultValue={task}
          onBlur={this.finishEdit.bind(this)}
          onKeyPress={this.checkEnter.bind(this)} /> :
        <div onClick={this.edit.bind(this)}>{task}</div>
    }</div>
  }
}
