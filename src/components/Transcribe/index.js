import React from 'react'
import { withRouter } from "react-router";
import { withFirebase } from '../Firebase';
import { Grid, TextareaAutosize } from '@material-ui/core';
import TranscribeZone from '../TranscribeZone';


const Transcribe = withRouter(class Transcribe extends React.Component {
  constructor() {
    super()
    this.state = {
      item: null
    }
  }

  async getItem(itemId) {
    const db = this.props.firebase.firestore
    const doc = await db.doc(`fragments/${itemId}`).get()
    const docData = Object.assign({ id: doc.id }, doc.data())
    this.setState({ item: docData })
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    this.getItem(id)
  }

  render() {
    const item = this.state.item
    const itemImg = item ? <img width="100%" src={item.url} /> : null
    const itemTranscribeZone = item ? <TranscribeZone item={item} /> : null
    return (
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            {itemImg}
          </Grid>
          <Grid item xs={6}>
            {itemTranscribeZone}
          </Grid>
        </Grid>

      </div>


    );
  }
})

export default withFirebase(Transcribe)