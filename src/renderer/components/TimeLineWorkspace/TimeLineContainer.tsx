import * as React from 'react';
import TimeLine from './TimeLine';
// @ts-ignore
import ReactCursorPosition from 'react-cursor-position';
import ShowRunner from '../ShowRunner';

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

interface IHocProps {
    position: ICursorPosition,
    children: JSX.Element;
}

export function withCursor <T extends ICursorPosition> (Child: React.ComponentType<T>) {
    return class extends React.Component<ICursorPosition & T, {}> {
        render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
            return (
                <ReactCursorPosition style={{ width: '100%', height: '100%' }}>
                    <Child {...this.props} position={this.props.position}/>
                </ReactCursorPosition>
            );
        }
    }
}
const TimelineContainer = () => {
    return (
        <TimeLine />
    )
};

export default TimelineContainer;
