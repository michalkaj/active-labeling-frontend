import React from 'react';
import Select from 'react-select';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = {
  Select: {
    width: "90%",
  }
}

export default function Sidebar(props) {
  return (
    <Grid
      container
      direction="column"
      spacing={2}
    >
      <Grid item container justify="space-evenly">
        <Button
          variant="contained"
          color="primary"
          onClick={props.onPrev}>Prev</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={props.onNext}>Next</Button>
      </Grid>
      <Grid
        container item
        alignItems="center"
        style={styles.Select}
      >
        <Select
          autoFocus="true"
          placeholder="Select label..."
          options={props.labels.map(labelToOption)}
          isMulti={props.multiclass}
          value={props.selectedLabel ? labelToOption(props.selectedLabel) : undefined}
          onChange={(selectedItems) => {
            selectedItems = (selectedItems === null) ? [] : selectedItems;
            props.onLabelClick(selectedItems.map(i => i.label));
          }}
        />
        </Grid>
      <Grid item>
        <LinearProgress variant="determinate" value={props.progress} />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          disabled={props.progress !== 100}
          onClick={props.onTeach}
        >
          Teach
        </Button>
      </Grid>
    </Grid>
    )
}

const labelToOption = (l) => {
  return {value: l.toLowerCase(), label: l}
}
