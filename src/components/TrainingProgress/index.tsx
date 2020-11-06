import React from "react";

type Props = {
    onSelectSample : (index: number) => void,
    labelColorMapping: Map<string, string>
}

const TrainingProgress = (props: Props) => {
    return (
        <div
            style={{width: '100%'}}
        >
        </div>
    )
}

export default TrainingProgress;