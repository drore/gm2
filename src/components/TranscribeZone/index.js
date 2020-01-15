import React from 'react'

import { withFirebase } from '../Firebase';
import { TextareaAutosize, Button } from '@material-ui/core';

const TranscribeZone = withFirebase(class Transcribe extends React.Component {
  constructor() {
    super()
    this.state = {
      transcription: null
    }
  }
  updateTranscription(event) {
    this.setState({transcription: event.target.value})
  }


  sendTranscription() {
    const db = this.props.firebase.firestore
    db.doc(`fragments/${this.props.item.id}`).update({transcription: this.state.transcription})
  }

  componentWillMount() {
    this.setState({ transcription: this.props.item.transcription })
  }

  render() {
    const transcription = this.state.transcription
    return (
      <React.Fragment>
        <TextareaAutosize defaultValue={transcription} onChange={this.updateTranscription.bind(this)} />

        <div>
          <Button variant="contained" color="primary" onClick={this.sendTranscription.bind(this)}>Update
</Button>
        </div>
      </React.Fragment>
    );
  }
})

export default TranscribeZone