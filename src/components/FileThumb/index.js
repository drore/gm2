import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';

export default function FileThumb(props) {
  const item = props.item
const hasTranscription = item.transcription != ''

  return (
    <div>
      <div title={item.transcription} style={{textDecoration:'underline',cursor:'pointer', color:'blue', fontWeight:'bold'}}>{item.name}{!!hasTranscription ? <CreateIcon style={{color:'#888'}}/>: null}</div>
      <div>
        <div>size (KB): {item.metadata.size}</div>
        <div>Uploaded: {item.metadata.timeCreated}</div>
      </div>
    </div>
  )
}