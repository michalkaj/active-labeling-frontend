import React, {Component} from 'react';
import 'react-tagsinput/react-tagsinput.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import TagsInput from "react-tagsinput";

const styles = {
  Form: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}

export default class Setup extends Component {
  constructor(props) {
    super(props)
    props.fetchConfig();
    this.state = {
      multiclass: props.multiclass,
      labels: props.labels,
      activeUrl: props.activeUrl
    }
  }

  componentDidMount() {
    this.props.fetchConfig()
  }

  handleAddLabelTag = (labels) => {
    this.setState({labels});
  }

  handleUrlChange = (event) => {
    this.setState({activeUrl: event.target.value});
  }

  handleMulticlassRadioChange = (event, value) => {
    this.setState({multiclass: value});
  }

  render() {
    return (
      <Grid
        item
        xs={12}
        style={styles.Form}
        container
        direction="column"
      >
        <Grid item>
          <TextField
            value={this.state.activeUrl}
            variant="outlined"
            margin="normal"
            fullWidth
            id="activeUrl"
            label="Active learning server url"
            name="activeUrl"
            onChange={this.handleUrlChange}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Multiclass"
            onChange={this.handleMulticlassRadioChange}
          />
        </Grid>

        <Grid item>
          <TagsInput
            value={this.state.labels}
            onChange={this.handleAddLabelTag}
            onlyUnique="true"
            addOnBlur="true"
            addOnPaste="true" />
          <Button
            variant="contained"
            color="primary"
            onClick={this.onSaveOptions}>Save settings</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.onLoadImages}>Load images</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.onSave}>Save labels</Button>
        </Grid>
      </Grid>
    )
  }

  onSaveOptions = () => {
    this.props.onSaveOptions(
      this.state.multiclass,
      this.state.labels,
      this.state.activeUrl
    )
  }
}
