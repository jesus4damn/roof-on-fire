import { ICounterActions } from './counterReducer/counterActions';
import {IAppActions} from "./appReducer/appActions";
import { IFixtureActions } from './fixturesReducer/fixturesActions';

export type RootActions = ICounterActions | IAppActions | IFixtureActions
