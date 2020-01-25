import React from 'react'
import { TextField, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
// md5Hash

const FileDetails = withFirebase(class FileDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      item: null
    }
  }

  componentWillMount() {
    const item = this.props.item
    this.setState({ item })
    this.verifyDBItem(item)
  }

  async verifyDBItem(item) {
    const self = this

    // Verify firestore record
    const db = this.props.firebase.firestore
    const collection = await db.collection(`fragments`).where('url', '==', item.url).limit(1).get();
    if (collection.size) {
      self.setState({ itemId: collection.docs[0].id })
    }
    else {
      // Create it
      db.collection(`fragments`).add({
        name: item.name,
        url: item.url,
        transcription: ''
      }).then((res) => {
        self.setState({ itemId: res.id })
      });
    }
  }

  componentWillReceiveProps() {
    const item = this.props.item
    this.setState({ item })
    this.verifyDBItem(item)

  }

  render() {
    const item = this.state.item
    const itemId = this.state.itemId
    const transcribeUrl = itemId && `/transcribe/${itemId}`
    const transcribeLink = transcribeUrl ? <Button variant="contained" color="primary"><Link to={transcribeUrl}>
      Transcribe
</Link></Button> : null;

    return (
      <div>
        <div><div><TextField id="standard-basic" value={item.name} label="Name" /></div>
          <div><TextField id="standard-basic" value={item.url} label="URL" /></div>
          <div><TextField id="standard-basic" value={item.desc} label="Desc" /></div>
          <div style={{ marginTop: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" disabled>Update</Button>

            {transcribeLink}

          </div>
        </div>
        <div>
          <img src={item.url} width="100%" />
        </div>

      </div>
    )
  }
})


export default FileDetails