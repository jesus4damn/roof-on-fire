import * as React from "react";
import {connect} from "react-redux";
import Field from '../components/Field';
import { generateFields } from '../Cues/Cues';

const Properties:React.FC = () => {
    const fieldsArr = generateFields();
    return (
        <React.Fragment>
            {fieldsArr.map(f => (
                <Field key={f.id} id={f.id} title={'PROP'}/>
            ))}
        </React.Fragment>
    )
}

export default connect(null, null)(Properties)