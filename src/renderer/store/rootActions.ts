import { ICounterActions } from './counterReducer/counterActions';
import {IAppActions} from "./appReducer/appActions";

export type RootActions = ICounterActions | IAppActions;
