import * as React from "react";
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { getCuesFields } from '../../../store/fieldsReducer/fieldsSelectors';
import { ICueField } from '../../../../types/fieldsTypes';
import CueFieldWrapper from './CueFieldWrapper';

interface IProps {
    fieldsArr?: ICueField[],
}

const Cues:React.FC<IProps> = ({fieldsArr}:IProps) => {
    return (
        <React.Fragment>
            {fieldsArr?.map((f:ICueField) => (
                <CueFieldWrapper field={f} key={f.id} />
            ))}
            {!fieldsArr?.length ? <h1></h1> : ''}
        </React.Fragment>
    )
};
const mapStateToProps = (state: RootState) => ({
    fieldsArr: getCuesFields(state),
});

export default connect(mapStateToProps, null)(Cues)
