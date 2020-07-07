import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Visualizer from './Visualizer';
import { RootState } from '../../../store/rootReducer';
import { decrement, increment } from '../../../store/visualizerReducer/visualizerActions';
import {RootActions} from "../../../store/rootActions";
import { getFixtures } from '../../../store/fixturesReducer/fixturesSelector';
import { setAllowAPI } from '../../../store/appReducer/appActions';

const mapStateToProps = (state: RootState) => ({
    value: state.counter.value,
    allowedAPI: state.app.allowedAPI,
    fixtures: getFixtures(state)
});

const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => ({
    incrementValue: () => dispatch(increment()),
    decrementValue: () => dispatch(decrement()),
    setAllowAPI: (v: boolean) => dispatch(setAllowAPI(v))
});

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);
