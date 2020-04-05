import { IVisualizerActions } from './visualizerReducer/visualizerActions';
import {IAppActions} from "./appReducer/appActions";
import { IFixtureActions } from './fixturesReducer/fixturesActions';
import { IFieldsActions } from './fieldsReducer/fieldsActions';
import { ICuesActions } from './cuesReducer/cuesActions';

export type RootActions =
    IVisualizerActions | IAppActions | IFixtureActions |
    IFieldsActions | ICuesActions
