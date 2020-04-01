import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { IPattern } from '../../../../types/fixtureTypes';

require('./Field.scss');

interface IProps {
    id: string,
    connected: IPattern | null
}

const Field: React.FC<IProps> = ({id, connected}) => {
    const itemBase = {
        name: '',
        id: '',
        img: ''
    };
    const item = {...itemBase, ...connected};
    return (
        <div className="totalWrap">
            <div className="wrap">
                <div className="imgWrap">
                    <div className="image">
                        <img className="preview__img" src={item.img} alt=""/>
                    </div>
                </div>
                <div className="titleWrap" style={{borderColor: item.id ? '#FFF' : '#666666'}}>
                    <span className="title"><a>{item.name ? item.name : ''}</a></span>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({});

export default connect(mapStateToProps,{})(Field);
