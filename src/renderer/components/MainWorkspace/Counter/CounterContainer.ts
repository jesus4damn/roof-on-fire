import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Counter from './Counter';
import { RootState } from '../../../store/rootReducer';
import { decrement, increment } from '../../../store/counterReducer/counterActions';
import {RootActions} from "../../../store/rootActions";

const mapStateToProps = (state: RootState) => ({
    value: state.counter.value
});

const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => ({
    incrementValue: () => dispatch(increment()),
    decrementValue: () => dispatch(decrement())
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
