import React from 'react';
import Grid from "@material-ui/core/Grid";
import {styled} from '@material-ui/core/styles';

const Container = styled(Grid)({
    height: "100%",
    margin: "auto"
})

const SampleImage = styled('img')({
    minHeight: "30%",
    maxHeight: "90%",
    objectFit: "contain",
    overflow: "hidden"
});

type Props = {
    imageSrc: string
}

const ImageClassification = (props: Props) => {
    return (
        <Container
            item
            container
            alignItems='center'
            justify='center'
        >
            <SampleImage
                src={props.imageSrc}
                alt="Label this"
            />
        </Container>
    )
}

export default ImageClassification;