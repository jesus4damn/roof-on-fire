import * as React from 'react';
import { IMusicContext } from '../misicContext/musicContext';
import { connect } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { getTimelineCues } from '../store/cuesReducer/cuesSelector';
import { getFixtures } from '../store/fixturesReducer/fixturesSelector';
import { updateFixture, updateFixtureShot } from '../store/fixturesReducer/fixturesActions';
import { ICue, ICueAction } from '../../types/cuesTypes';
import { IFixture } from '../../types/fixtureTypes';

interface IState {
    events: {[key: number]: {id: string, shot: boolean}}
}

class ShowRunner extends React.Component<IMusicContext & any> {

    state: IState = {
        events: {}
    };

    componentDidMount(): void {
        const { cues } = this.props;
        this.createTimeEvents(cues);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.context.musicContext.currentTime.toFixed(2) !== this.props.context.musicContext.currentTime.toFixed(2)) {
            this.timeListner(this.props.context.musicContext.currentTime);
        }
        if (prevProps.cues !== this.props.cues) {
            this.createTimeEvents(this.props.cues)
        }
    }

    createTimeEvents = (cues:ICue[]) => {
        console.log('createTimeEvents ====>');
        let events: {[key: number]: {id: string, shot: boolean}} = {};
        cues.forEach((c: ICue) => {
            c.actions.forEach((a:ICueAction, i: number) => {
                events[+(+c.startTime + a.startTime + i).toFixed(1)] = {id: a.fixtureId, shot: true};
                events[+(+c.startTime + a.totalTime + i).toFixed(1)] = {id: a.fixtureId, shot: false};
            })
        });
        console.log(events);
        this.setState({
            events: events
        })
    };

    timeListner = (time: number) => {
        if (this.state.events[+time.toFixed(1)]) {
            console.log('UPDATE ====>');
            console.log(this.state.events[+time.toFixed(1)]);
            this.props.updateFixtureShot(this.state.events[+time.toFixed(1)])
        }
        //console.log(this.props.fixtures);
        // const activeFixIds = this.props.fixtures.filter((f:IFixture) => f.shot).map((f:IFixture) => f.id);
        // console.log(activeFixIds);
        // cues.forEach(c => {
        //     if (time > c.startTime && (c.endTime ? time < c.endTime : time < c.startTime + 1)) {
        //         c.actions.forEach(a => {
        //             if (!activeFixIds.includes(a.fixtureId)) {
        //                 console.log("true ===> fire");
        //                 console.log(activeFixIds);
        //
        //                 this.props.updateFixtureShot({id: a.fixtureId, shot: true})
        //             }
        //         });
        //
        //     } else {
        //         c.actions.forEach(a => {
        //             if (activeFixIds.includes(a.fixtureId)) {
        //                 console.log("stop ===> fire");
        //                 this.props.updateFixtureShot({id: a.fixtureId, shot: false})
        //             }
        //         });
        //         //console.log("false")
        //     }
        // })
    };

    onTimeComes = () => {

    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        //this.timeListner(this.props.context.musicContext.currentTime, this.props.cues);
        return null;
    }
}

const mapStateToProps = (state: RootState) => ({
    cues: getTimelineCues(state),
    fixtures: getFixtures(state)
});

export default connect(mapStateToProps, {updateFixtureShot})(ShowRunner);
