import * as React from "react";
import {connect} from "react-redux";
import { RootState } from '../../../store/rootReducer';
import { getCuesFields } from '../../../store/fieldsReducer/fieldsSelectors';
import { ICueField } from '../../../../types/fieldsTypes';
import CueFieldWrapper from './CueFieldWrapper';

interface IProps {
    fieldsArr: ICueField[]
}

const Cues:React.FC<IProps> = ({fieldsArr}) => {

    return (
        <React.Fragment>
            {fieldsArr.map((f) => (
                <CueFieldWrapper field={f} key={f.id} />
            ))}
        </React.Fragment>
    )
};
const mapStateToProps = (state: RootState) => ({
    fieldsArr: getCuesFields(state),
});

export default connect(mapStateToProps, null)(Cues)
