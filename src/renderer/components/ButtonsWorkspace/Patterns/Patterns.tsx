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
    patternsType: TPatternType | 'cues',
    setNewFields: (patterns: IPattern[], patternsType: TPatternType) => void
}

const Patterns:React.FC<IProps> = ({patternsType, setNewFields, fieldsArr}) => {

    return (
        <React.Fragment>
            {fieldsArr.map(f => (
                <Field
                    key={f.id}
                    id={f.id}
                    connected={isPatternField(f) ? f.connected : null}
                />
            ))}
            {!fieldsArr.length ? <h1></h1> : ''}
        </React.Fragment>
    )
};

const mapStateToProps = (state: RootState) => ({
    patternsType: state.app.fixturesPropertiesScreenWindow,
    fieldsArr: getFieldsArr(state),
});

export default connect(mapStateToProps, {setNewFields})(Patterns)
