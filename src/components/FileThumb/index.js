import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  image: {
    width: '3rem',
    marginRight: '0.5rem',
    marginBottom: '0.5rem'
  },
}));


export default function FileThumb(props) {
  const item = props.item

  return (
    <div>
      {/* <img src={item.url} style={{width:'100%'}}/> */}
      <div style={{textDecoration:'underline', color:'blue', fontWeight:'bold'}}>{item.name}</div>
      <div>
        <div>size (KB): {item.metadata.size}</div>
        <div>Uploaded: {item.metadata.timeCreated}</div>
      </div>
    </div>
  )
}