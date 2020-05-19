import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Visualizer from './Visualizer';
import { RootState } from '../../../store/rootReducer';
import { decrement, increment } from '../../../store/visualizerReducer/visualizerActions';
import {RootActions} from "../../../store/rootActions";
import { getFixtures } from '../../../store/fixturesReducer/fixturesSelector';

const mapStateToProps = (state: RootState) => ({
    value: state.counter.value,
    fixtures: getFixtures(state)
});

const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => ({
    incrementValue: () => dispatch(increment()),
    decrementValue: () => dispatch(decrement())
});

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);
