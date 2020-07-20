import * as React from 'react';
import { memo, useEffect, useState } from 'react';

const styles = {
    display: 'inline-block',
    transform: 'rotate(-7deg)',
    WebkitTransform: 'rotate(-7deg)',
    height: `30px`,
    width: `30px`,
    border: '1px solid white'
};

export interface BoxDragPreviewProps {
    src: string
}

export interface BoxDragPreviewState {
    tickTock: any
}

export const BoxDragPreview: React.FC<BoxDragPreviewProps> = memo(
    ({ src }) => {
        const [tickTock, setTickTock] = useState(false);

        useEffect(
            function subscribeToIntervalTick() {
                const interval = setInterval(() => setTickTock(!tickTock), 500);
                return () => clearInterval(interval)
            },
            [tickTock],
        );

        return (
                <img src={src} style={styles}/>
        )
    },
)
