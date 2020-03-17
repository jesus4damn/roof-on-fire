import { I_CounterActions } from './counterReducer/counterActions';
import {I_AppActions} from "./appReducer/appActions";

export type RootActions = I_CounterActions | I_AppActions;
