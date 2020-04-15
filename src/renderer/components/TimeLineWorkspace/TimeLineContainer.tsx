import * as React from 'react';
import TimeLine from './TimeLine';

export interface ICursorPosition {
    detectedEnvironment: {
        isMouseDetected: boolean,
        isTouchDetected: boolean,
    },
    elementDimensions: {
        width: number,
        height: number
    },
    isActive: boolean,
    isPositionOutside: boolean,
    position: {
        x: number,
        y: number
    }
}

const TimeLineCursorContainer: React.FC<any> = ({position}:ICursorPosition) => {
    return <TimeLine position={position}/>
};

export default TimeLineCursorContainer;
