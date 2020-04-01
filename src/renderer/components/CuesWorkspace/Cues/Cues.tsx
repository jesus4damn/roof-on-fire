import * as React from "react";
import {connect} from "react-redux";
import Field from '../components/Field';
import { generateFields } from '../../../store/mockDataGenerators';

const Cues:React.FC = () => {
    const fieldsArr = generateFields(null);
    return (
        <React.Fragment>
            {fieldsArr.map(f => (
                <Field key={f.id} id={f.id} connected={null}/>
            ))}
        </React.Fragment>
    )
};

export default connect(null, null)(Cues)
