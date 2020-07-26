import * as React from 'react';
import { ICueAction } from '../../../../types/cuesTypes';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { getFixtureById, getPatternByAction } from '../../../store/fixturesReducer/fixturesSelector';
import { IFixture, IPattern } from '../../../../types/fixtureTypes';
import { useDrop } from 'react-dnd';
import { dragTypes } from '../../../../types/dragTypes';

require('./CueEditor.scss');

interface ICommonProps {
    action: ICueAction
    index: number
    onUpdate: (toUpdate: ICueAction) => void
}

interface IConnectedProps {
    fixture: IFixture,
    pattern: IPattern
}

type TProps = ICommonProps
    & IConnectedProps & any & any;

const ActionRow: React.FC<TProps> = ({action, fixture, pattern, index, onUpdate}) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: dragTypes.PATTERN_FIELD,
        drop: (item: {pattern: IPattern | null, type: string }) => {
            if (item.pattern && item.pattern.id) {
                onUpdate({...action, patternId: item.pattern.id, img: item.pattern.img})
            }
            console.log(item)
        },
        //canDrop: () => onDropPattern(),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    return (
        <React.Fragment>
            <td>{index}</td>
            <td style={{fontSize: '0.7rem'}}>{fixture.name}</td>
            <td ref={drop} style={{backgroundColor: canDrop ? isOver ? 'green' : '#3cd07a2e' : ''}}>
                <img style={pattern.color ? {filter: `drop-shadow(0 0 5px ${pattern.color})`}: {}} src={action.img} alt=""/>
            </td>
            <td>{pattern && pattern.number}</td>
            <td>{action.startTime.toFixed(2)}</td>
            <td>{(action.startTime + action.totalTime).toFixed(2)}</td>
            <td>{pattern && pattern.offset}</td>
            {/*
            // @ts-ignore*/}
            <td colSpan={"7"}  className="lineDecorate"/>
        </React.Fragment>

    );
};

const mapStateToProps = (state: RootState, props: ICommonProps) => ({
    fixture: getFixtureById(state, props.action.fixtureId),
    pattern: getPatternByAction(state, props.action)
});

export default connect(mapStateToProps, null)(ActionRow);
