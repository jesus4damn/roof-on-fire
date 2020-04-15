import * as React from 'react';
import { ICue } from '../../../../types/cuesTypes';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { setSelectedCue } from '../../../store/cuesReducer/cuesActions';

require('./CueList.scss');

interface ICommonProps {
    cue: ICue
    index: number
    selected: boolean
}

interface IConnectedProps {
    setSelectedCue: (cue: ICue) => void
}

type TProps = ICommonProps
    & IConnectedProps & any & any;

const CueListItem: React.FC<TProps> = ({cue, index, selected, setSelectedCue}) => {
    const setActiveCue = () => {
        setSelectedCue(cue);
    };
    return (
        <tr onClick={setActiveCue} className={'cueListItem'} style={{cursor: 'pointer', backgroundColor: selected ? 'green' : 'inherit'}}>
            <td>{index}</td>
            <td>{cue.name}</td>
            <td>{cue.startTime}</td>
            <td>{cue.endTime - cue.startTime}</td>
            <td>2s</td>
            <td className="headerTableCuesList-dmx">dmx</td>
        </tr>
    );
};

const mapStateToProps = (state: RootState, props: ICommonProps) => ({
});

export default connect(null, {setSelectedCue})(CueListItem);
