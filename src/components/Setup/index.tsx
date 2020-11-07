import React, {useEffect} from 'react';
import 'react-tagsinput/react-tagsinput.css'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TagsInput from "react-tagsinput";
import Config from "../../utils/config";
import {styled} from "@material-ui/styles";
import {Box, FormControl, Input, Paper, Radio, RadioGroup, Typography} from "@material-ui/core";
import 'App.css'
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import loadJson from "../../utils/loadJson";


const MainForm = styled(Grid)({
    width: '50%',
});

const BatchSizeInput = styled(Input)({
    width: '50px'
});

const TagsInputGrid = styled(Grid)({
    height: '100px'
});

const SetupItem = styled(Grid)({
    paddingBottom: '2%',
})


type Props = {
    onLoadImages: () => void,
    loadConfig: (event: any) => void,
    loadAnnotations: (event: any) => void,
    saveConfig: (name: string, value: any) => void,
    updateColorMapping: (labelNames: string[]) => void,
    saveSamples: () => void,
    config: Config
}

const MyPaper = styled(Paper)({
    width: '100%',
    height: '100%',
    elevation: 3,
    padding: '5%'
})

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
                <MyPaper>
                <SetupItem item container>
                    <Typography >
                        <Box color="textPrimary" fontSize="h6.fontSize" fontWeight='fontWeightBold'>
                            Backend URL
                        </Box>
                    </Typography>
                    <TextField
                        value={props.config.server_url}
                        margin='normal'
                        fullWidth
                        name='activeUrl'
                        onChange={(event) => props.saveConfig('server_url', event.target.value)}
                    />
                </SetupItem>

                <SetupItem item container>
                    <Typography >
                        <Box color="textPrimary" fontSize="h6.fontSize" fontWeight='fontWeightBold'>
                            Dataset name
                        </Box>
                    </Typography>
                    <TextField
                        value={props.config.dataset_name}
                        margin='normal'
                        fullWidth
                        name='datasetName'
                        onChange={(event) => {props.saveConfig('dataset_name', event.target.value)}}
                    />
                </SetupItem>

                <SetupItem item container>
                    <Grid>
                        <Typography >
                            <Box color="textPrimary" fontSize="h6.fontSize" fontWeight='fontWeightBold'>
                                Labels
                            </Box>
                        </Typography>
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
                </SetupItem>

                <SetupItem item container>
                    <Grid>
                        <Typography >
                            <Box color="textPrimary" fontSize="h6.fontSize" fontWeight='fontWeightBold'>
                                Initial training set size
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Slider
                                defaultValue={100}
                                step={10}
                                marks
                                min={10}
                                max={1000}
                                onChange={(_, value) => props.saveConfig('training_set_size', value)}
                            />
                        </Grid>
                        <Grid item>
                            <BatchSizeInput
                                value={props.config.training_set_size}
                                margin="dense"
                                inputProps={{
                                    step: 10,
                                    min: 10,
                                    max: 1000,
                                    type: 'number',
                                }}
                            />
                        </Grid>
                    </Grid>
                </SetupItem>
                <SetupItem item container>
                    <Grid>
                        <Typography >
                            <Box color="textPrimary" fontSize="h6.fontSize" fontWeight='fontWeightBold'>
                                Query size
                            </Box>
                        </Typography>
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
                </SetupItem>

                <SetupItem item container>
                    <Grid>
                        <Typography >
                            <Box color="textPrimary" fontSize="h6.fontSize" fontWeight='fontWeightBold'>
                                Relative pool size
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Slider
                                defaultValue={0.2}
                                step={0.1}
                                marks
                                min={0}
                                max={1}
                                onChange={(_, value) => props.saveConfig('pool_size', value)}
                            />
                        </Grid>
                        <Grid item>
                            <BatchSizeInput
                                value={props.config.pool_size}
                                margin="dense"
                                inputProps={{
                                    step: 0.01,
                                    min: 0,
                                    max: 1,
                                    type: 'number',
                                }}
                            />
                        </Grid>
                    </Grid>
                </SetupItem>

                <Grid item container justify={"space-evenly"}>
                   <Button
                        variant="contained"
                        color="primary"
                        component="label"
                   >
                       Load config
                       <input
                            type='file'
                            onChange={props.loadConfig}
                            style={{ display: "none" }}
                            />
                        </Button>
                   <Button
                       variant="contained"
                       color="primary"
                       component="label">
                       Load Annotations
                      <input
                        type='file'
                        onChange={props.loadAnnotations}
                        style={{ display: "none" }}
                      />
                   </Button>
                   <Button
                       variant="contained"
                       color="primary"
                       onClick={props.saveSamples}>Save annotations</Button>
                </Grid>
                </MyPaper>
            </MainForm>
        </Grid>
    )
}

export default Setup;