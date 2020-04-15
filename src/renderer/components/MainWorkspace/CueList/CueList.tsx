import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { getSelectedCue, getTimelineCues } from '../../../store/cuesReducer/cuesSelector';
import { ICue } from '../../../../types/cuesTypes';
import { dragTypes } from '../../../../types/dragTypes';
import CueListItem from './CueListItem';
import { useDrop } from 'react-dnd';

require('./CueList.scss');

interface IProps {
    cues: ICue[]
    selectedCue: ICue | null,
}

const CueList:React.FC<IProps> = ({cues, selectedCue}) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: dragTypes.CUE_FIELD,
        drop: () => ({ cueList: 'CUELIST' }),
        //canDrop: () => onDropPattern(),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    return (
        <div className="WrapCuesList" ref={drop}>
            <table className="WrapCuesListTable">
                <tbody className={`TableCuesList ${canDrop && isOver ? 'TableCuesList-active' : ''}`}>
                    <tr className="headerTableCuesList">
                        <td>№</td>
                        <td>Cue</td>
                        <td>Start time</td>
                        <td>Total time</td>
                        <td>Offset</td>
                        <td>Type</td>
                    </tr>
                    {cues && cues.length && cues.map((c, i) =>
                        <CueListItem key={c.id} cue={c} index={i} selected={selectedCue && selectedCue.id === c.id} />
                        )}
                </tbody>
            </table>

            <div className="WrapEffect">
                <button className="EffectBt">Effect</button>
                <div className="EffectItem">
                    <span>
                    Offset
                    </span>
                    <span>
                        1
                    </span>
                </div>
                <div className="EffectItem">
                    <span>
                    Time
                    </span>
                    <span>
                        5
                    </span>
                </div>
                <button>Forward</button>
                <button>Backward</button>
                <button>Inside</button>
                <button>Outside</button>
                <button>Mirror</button>
                <div className="EffectWrapTest">
                    <span className="EffectItemTest">
                    Test
                    </span>
                    <div className="Effecttest">
                        <span className="Effecttest-active"></span>
                        <span></span>
                        <span></span>
                        <span className="Effecttest-active"></span>
                        <span className="Effecttest-error"></span>
                        <span></span>
                        <span className="Effecttest-active"></span>
                        <span></span>
                    </div>

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    cues: getTimelineCues(state),
    selectedCue: getSelectedCue(state)
});

export default connect(mapStateToProps, null)(CueList);
