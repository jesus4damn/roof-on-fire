import * as React from 'react';
import { useMemo } from 'react';

require('./Field.scss');

interface IProps {
    active: boolean | undefined | null
    color: string | undefined | null
    name: string | undefined | null
    img: string | undefined | null
    select: () => void
    callContext: () => void
}

const Field: React.SFC<IProps> = ({   active,
                                     color,
                                     name,
                                     img,
                                     select,
                                     callContext,
                                 }) => {

    return (
        <div className="totalWrap"
             style={{
                 borderColor: active ? 'orange' : 'inherit',
             }}
        >
            <div className="wrap"
                 onClick={select}
                 onContextMenu={callContext}
            >
                <div className="imgWrap" style={{borderColor: color ? color : '#666666'}}>
                    <div className="image" style={{ minHeight: "30px", minWidth: "30px" }}>
                        <img className="preview__img" src={img ? img : ''} alt=""/>
                    </div>
                </div>
                <div className="titleWrap" style={{borderColor: name ? '#FFF' : '#666666'}}>
                    <span className="title"><a>{name ? name : ''}</a></span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Field);
