import * as React from 'react';
import { ICueAction } from '../../../../types/cuesTypes';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { getFixtureById, getPatternByAction } from '../../../store/fixturesReducer/fixturesSelector';
import { IFixture, IPattern } from '../../../../types/fixtureTypes';

require('./CueEditor.scss');

interface ICommonProps {
    action: ICueAction
}

interface IConnectedProps {
    fixture: IFixture,
    pattern: IPattern
}

type TProps = ICommonProps
    & IConnectedProps & any & any;

const ActionRow: React.FC<TProps> = ({action, fixture, pattern}) => {
    return (
        <tr className="headerTableCues-active">
            <td>1</td>
            <td>{fixture.name}</td>
            <td><img src={action.img} alt=""/></td>
            <td>{pattern && pattern.dmxStart}</td>
            <td>{action.startTime}</td>
            <td>{action.startTime + action.totalTime}</td>
            <td>{pattern && pattern.offset}</td>
        </tr>
    );
};

const mapStateToProps = (state: RootState, props: ICommonProps) => ({
    fixture: getFixtureById(state, props.action.fixtureId),
    pattern: getPatternByAction(state, props.action)
});

export default connect(mapStateToProps, null)(ActionRow);
