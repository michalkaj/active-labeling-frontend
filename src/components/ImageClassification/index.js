import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";

const styles = {
  Container: {
    height: "100%"
  },
  Buttons: {
    justifyContent: 'center',
    backgroundColor: 'black'

  },
  SampleContainer: {
    height: "90%"
  },
  Sample: {
    minHeight: "30%",
    maxHeight: "90%",
    objectFit: "contain",
    overflow: "hidden"
  }
}

export default function ImageClassification(props) {
  return (
    <Grid
      item
      container
      style={styles.Container}
    >
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        style={styles.SampleContainer}
      >
        <img
          src={props.imageSrc}
          style={styles.Sample}
          alt="Label this"
        />
      </Grid>
      {/*<Grid*/}
      {/*  container*/}
      {/*  direction="row"*/}
      {/*  justify="space-evenly"*/}
      {/*  alignItems="center"*/}
      {/*>*/}
      {/*    {props.labels.map((label, i) => {*/}
      {/*      return (*/}
      {/*        <Button*/}
      {/*          key={i}*/}
      {/*          onClick={() => props.onLabelClick([label], true)}*/}
      {/*          variant="contained"*/}
      {/*          color="primary">*/}
      {/*          {`(${i + 1}) ${label}`}*/}
      {/*        </Button>*/}
      {/*      )*/}
      {/*    })}*/}
      {/*</Grid>*/}
    </Grid>
  )
}