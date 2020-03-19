import * as React from 'react';

require('./Field.scss');

interface I_Props {
    id: string,
    title: string
}

const Field: React.FC<I_Props> = ({id, title}) => {
    return (
        <div className="totalWrap">
            <div className="wrap">
                <div className="imgWrap">
                    <span className="image">IMG</span>
                </div>
                <div className="titleWrap">
                    <span className="title"><a>{title}</a></span>
                </div>
            </div>
        </div>
    );
};

export default Field;