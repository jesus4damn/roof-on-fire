import * as React from "react";
import {connect} from "react-redux";
import Field from '../components/Field';
import { getPatternsByFixtureType } from '../../../store/fixturesReducer/fixturesSelector';
import { RootState } from '../../../store/rootReducer';
import { IPattern } from '../../../../types/fixtureTypes';
import { useEffect } from 'react';
import { setNewFields } from '../../../store/fieldsReducer/fieldsActions';
import { IField, TPatternType } from '../../../../types/fieldsTypes';
import { getFieldsArr } from '../../../store/fieldsReducer/fieldsSelectors';

interface IProps {
    fieldsArr: IField[]
    patternsType: TPatternType | 'cues',
    fixturePatterns: IPattern[],
    setNewFields: (patterns: IPattern[], patternsType: TPatternType) => void
}

const Patterns:React.FC<IProps> = ({patternsType, fixturePatterns, setNewFields, fieldsArr}) => {

    return (
        <React.Fragment>
            {fieldsArr.map(f => (
                <Field
                    key={f.id}
                    id={f.id}
                    connected={f.connected}
                />
            ))}
        </React.Fragment>
    )
};

const mapStateToProps = (state: RootState) => ({
    fixturePatterns: getPatternsByFixtureType(state),
    patternsType: state.app.fixturesPropertiesScreenWindow,
    fieldsArr: getFieldsArr(state),
});

export default connect(mapStateToProps, {setNewFields})(Patterns)
