import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Visualizer from './Visualizer';
import { RootState } from '../../../store/rootReducer';
import { decrement, increment } from '../../../store/visualizerReducer/visualizerActions';
import {RootActions} from "../../../store/rootActions";

const mapStateToProps = (state: RootState) => ({
    value: state.counter.value
});

const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => ({
    incrementValue: () => dispatch(increment()),
    decrementValue: () => dispatch(decrement())
});

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);
