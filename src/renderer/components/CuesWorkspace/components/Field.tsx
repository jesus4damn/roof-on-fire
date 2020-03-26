import * as React from 'react';

require('./Field.scss');

interface IProps {
    id: string,
    title: string
}

const Field: React.FC<IProps> = ({id, title}) => {
    return (
        <div className="totalWrap">
            <div className="wrap">
                <div className="imgWrap">
                    <div className="image">
                    <img className="preview__img" src="src/renderer/assets/no_img-block-right.svg" alt=""/>
                    </div>
                    
                </div>
                <div className="titleWrap">
                    <span className="title"><a>{title}</a></span>
                </div>
            </div>
        </div>
    );
};

export default Field;
