import React, {useState} from 'react';
import 'react-tagsinput/react-tagsinput.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import TagsInput from "react-tagsinput";
import Config from "../../model/config";
import {styled} from "@material-ui/styles";


const MainForm = styled(Grid)({
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

type Props = {
    onLoadImages: () => void,
    fetchConfig: () => void,
    onSave: () => void,
    config: Config
}


const Setup = (props: Props) => {
    const [config, setConfig] = useState(props.config);

    return (
        <MainForm
            item
            xs={12}
            // style={styles.Form}
            container
            direction="column"
        >
            <Grid item>
                <TextField
                    value={config.activeUrl}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="activeUrl"
                    label="Active learning server url"
                    name="activeUrl"
                    onChange={(event) => setConfig((prevState) => handleUrlChange(event, prevState))}
                />
            </Grid>
            <Grid item>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Multiclass"
                    onChange={(event, value) => setConfig((prevState) => handleMulticlassRadioChange(event, value, prevState))}
                />
            </Grid>

            <Grid item>
                <TagsInput
                    value={config.allowed_labels}
                    onChange={(labels) => setConfig((prevState) => handleAddLabelTag(labels, prevState))}
                    onlyUnique={true}
                    addOnBlur={true}
                    addOnPaste={true}/>
                <Button
                    variant="contained"
                    color="primary">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.onLoadImages}>Load images</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.onSave}>Save labels</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.fetchConfig}>Fetch config</Button>
                </Button>
            </Grid>
        </MainForm>
    )
}


const handleAddLabelTag = (labels: Array<string>, prevState: Config) => {
    return new Config(labels, prevState.multiclass, prevState.activeUrl);
}

const handleUrlChange = (event: any, prevState: Config) => {
    return new Config(prevState.allowed_labels, prevState.multiclass, event.target.value);
}

const handleMulticlassRadioChange = (event: React.ChangeEvent<{}>,
                                     value: boolean, prevState: Config) => {
    return new Config(prevState.allowed_labels, value, prevState.activeUrl);
}


export default Setup;