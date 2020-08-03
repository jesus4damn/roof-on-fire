import * as React from "react";
import {connect} from "react-redux";
import Field from './PatternFieldWrapper';
import { RootState } from '../../../store/rootReducer';
import { IPattern } from '../../../../types/fixtureTypes';
import { setNewFields } from '../../../store/fieldsReducer/fieldsActions';
import { IField, IPatternField, TPatternType } from '../../../../types/fieldsTypes';
import { getFieldsArr } from '../../../store/fieldsReducer/fieldsSelectors';
import { isPatternField } from '../../../store/fieldsReducer/fieldsReducer';

interface IProps {
    fieldsArr: Array<IField | IPatternField>
}
interface ICommonProps {
    patternsType: TPatternType | 'cues' | 'all',
}

const Patterns:React.FC<IProps & ICommonProps> = ({fieldsArr}) => {
    return (
        <React.Fragment>
            {fieldsArr.map(f => (
                <Field
                    key={f.id}
                    id={f.id}
                    connected={isPatternField(f) ? f.connected : null}
                />
            ))}
            {!fieldsArr.length ? <h1> </h1> : ''}
        </React.Fragment>
    )
};

const mapStateToProps = (state: RootState, props: ICommonProps) => ({
    fieldsArr: getFieldsArr(state, props.patternsType),
});

export default connect(mapStateToProps, {})(Patterns)
