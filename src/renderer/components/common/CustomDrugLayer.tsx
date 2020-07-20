import * as React from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';
import { BoxDragPreview } from './BoxDrugPreview';
import { dragTypes } from '../../../types/dragTypes';

export interface CustomDragLayerProps {
    snapToGrid?: boolean
    src: string
}
const layerStyles: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '30px',
    display: 'flex',
    borderRadius: '5px',
    height: '37px',
    padding: `7px 7px 0 7px`,
    textAlign: 'center',
    minWidth: '32px',
};

function getItemStyles(
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null,
    isSnapToGrid: boolean,
) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        }
    }

    let { x, y } = currentOffset;

    // if (isSnapToGrid) {
    //     x -= initialOffset.x
    //     y -= initialOffset.y
    //     ;[x, y] = snapToGrid(x, y)
    //     x += initialOffset.x
    //     y += initialOffset.y
    // }

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
    }
}

export const CustomDragLayer: React.FC<CustomDragLayerProps> = (props) => {
    const {
        itemType,
        isDragging,
        item,
        initialOffset,
        currentOffset,
    } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    function renderItem() {
        switch (itemType) {
            case dragTypes.PATTERN_FIELD:
                return (<BoxDragPreview src={props.src} />);
            default:
                return null
        }
    }

    if (!isDragging) {
        return null
    }

    return (
        <div style={layerStyles}>
            <div
                style={getItemStyles(initialOffset, currentOffset, false)}
            >
                {renderItem()}
            </div>
        </div>
    )
}
