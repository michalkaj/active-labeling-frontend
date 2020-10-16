import React, {useEffect} from 'react';
import 'react-tagsinput/react-tagsinput.css'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TagsInput from "react-tagsinput";
import Config from "../../model/config";
import {styled} from "@material-ui/styles";
import {FormControl, Input, Radio, RadioGroup, Typography} from "@material-ui/core";
import 'App.css'
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";


const MainForm = styled(Grid)({
    width: '50%'
});

const BatchSizeInput = styled(Input)({
    width: '50px'
});

const TagsInputGrid = styled(Grid)({
    height: '100px'
});


type Props = {
    onLoadImages: () => void,
    fetchConfig: () => void,
    saveConfig: (name: string, value: any) => void,
    updateColorMapping: (labelNames: string[]) => void,
    saveSamples: () => void,
    config: Config
}


const Setup = (props: Props) => {
    console.log('stup', props.config);
    return (
        <Grid
            container
            justify='center'
        >
            <MainForm
                container
                spacing={3}
            >
                <Grid item container>
                    <Typography variant='h6' gutterBottom>Active learning backend URL</Typography>
                    <TextField
                        value={props.config.active_url}
                        margin='normal'
                        fullWidth
                        name='activeUrl'
                        onChange={(event) => props.saveConfig('server_url', event.target.value)}
                    />
                </Grid>

                <Grid item container>
                    <Typography variant='h6' gutterBottom>Dataset name</Typography>
                    <TextField
                        value={props.config.dataset_name}
                        margin='normal'
                        fullWidth
                        name='datasetName'
                        onChange={(event) => {props.saveConfig('dataset_name', event.target.value)}}
                    />
                </Grid>

                <Grid item container>
                    <FormControl component="fieldset">
                        <Typography variant='h6' gutterBottom>Allow multiple labels per image</Typography>
                        <RadioGroup row name="multiclass" value={props.config.multiclass}
                                    onChange={(event) => props.saveConfig('multiclass', event.target.value)}>
                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item container>
                    <Grid>
                        <Typography variant='h6' gutterBottom>Add labels</Typography>
                    </Grid>
                    <TagsInputGrid container>
                        <TagsInput
                            value={props.config.allowed_labels}
                            onChange={(labelNames) => {
                                props.updateColorMapping(labelNames);
                                props.saveConfig('allowed_labels', labelNames);
                            }}
                            onlyUnique={true}
                            addOnBlur={true}
                            addOnPaste={true}/>
                    </TagsInputGrid>
                </Grid>

                <Grid item container>
                    <Grid>
                        <Typography variant='h6' gutterBottom>Query batch size</Typography>
                    </Grid>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Slider
                                defaultValue={10}
                                step={5}
                                marks
                                min={5}
                                max={250}
                                onChange={(_, value) => props.saveConfig('batch_size', value)}
                            />
                        </Grid>
                        <Grid item>
                            <BatchSizeInput
                                value={props.config.batch_size}
                                margin="dense"
                                inputProps={{
                                    step: 10,
                                    min: 0,
                                    max: 250,
                                    type: 'number',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container>
                    <Grid>
                        <Typography variant='h6' gutterBottom>Relative pool size</Typography>
                    </Grid>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Slider
                                defaultValue={15}
                                step={5}
                                marks
                                min={5}
                                max={100}
                                onChange={(_, value) => props.saveConfig('batch_size', value)}
                            />
                        </Grid>
                        <Grid item>
                            <BatchSizeInput
                                value={props.config.batch_size / 100}
                                margin="dense"
                                inputProps={{
                                    step: 1,
                                    min: 0,
                                    max: 100,
                                    type: 'number',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container justify={"space-evenly"}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.fetchConfig}>Fetch config</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.saveSamples}>Save annotations</Button>
                </Grid>
            </MainForm>
        </Grid>
    )
}

export default Setup;