import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  image: {
    width: '3rem',
    height: '3rem'
  },
}));


export default function FileThumb(props) {
  const classes = useStyles();
  const item = props.item

  return (
    <img className={classes.image} src={item.url} />
  )
}