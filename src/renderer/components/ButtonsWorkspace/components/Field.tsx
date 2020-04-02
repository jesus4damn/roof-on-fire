import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { IPattern } from '../../../../types/fixtureTypes';
import { setFixturePattern } from '../../../store/fixturesReducer/fixturesActions';

require('./Field.scss');

interface IProps {
    id: string,
    connected: IPattern | null
    setFixturePattern: (pattern: IPattern) => void
}

const Field: React.FC<IProps> = ({id, connected, setFixturePattern}) => {
    const itemBase = {
        name: '',
        id: '',
        img: ''
    };
    const item = {...itemBase, ...connected};
    const onClick = () => {
        if(connected !== null) {
            setFixturePattern({...connected, active: true})
        }
    };
    return (
        <div className="totalWrap" style={{borderColor: connected && connected.active ? 'orange' : 'inherit'}}>
            <div className="wrap" onClick={onClick}>
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

export default connect(mapStateToProps,{setFixturePattern})(Field);
