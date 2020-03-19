import * as React from "react";
import {connect} from "react-redux";
import Field from '../components/Field';

const generateField = () => {
    return {
        id: 'ddd' + Math.random()*55,
        title: 'empty'
    }
}
export const generateFields = () => {
    let fieldArr = []
    for ( let i = 0; fieldArr.length < 50; i++) {
        fieldArr.push(generateField())
    }
    return fieldArr;
}

const Cues:React.FC = () => {
    const fieldsArr = generateFields();
    return (
        <React.Fragment>
            {fieldsArr.map(f => (
                <Field key={f.id} id={f.id} title={f.title}/>
            ))}
        </React.Fragment>
    )
}

export default connect(null, null)(Cues)