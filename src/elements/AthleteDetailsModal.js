import React from 'react';
import Modal from 'react-modal';
import { segmentName } from "../segments";
import { secondsToHms } from '../utils/timeFormat';
import moment from 'moment';
import '../css/modal.css';
import {withRouter} from 'react-router';

const AthleteDetailsModal = ({ modalOpen, closeModal, athlete, history, location }) => {
    const goToSegment = (segmentId) => {
        const currentPathName = location.pathname;
        const url = '/segment/' + segmentId;
        if (currentPathName !== url) {
            history.push(url);
        } else {
            closeModal();
        }
    }

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            onOverlayClick={closeModal}
            contentLabel={athlete.athlete_name}
            className="content"
            overlayClassName="overlay"
        >
            <span className="close" onClick={closeModal}>&times;</span>
            <h1>{athlete.athlete_name}</h1>
            <table className="container">
                <thead>
                    <tr>
                        <th><h1>Segment</h1></th>
                        <th><h1>Poeng</h1></th>
                        <th><h1>Tid</h1></th>
                        <th><h1>Dato for aktivitet</h1></th>
                    </tr>
                </thead>
                <tbody>
                    {athlete.segments.sort((a, b) => a.points < b.points).map((segment) => {
                        return (
                            <tr key={segment.segment_id}>
                                <td className="pointy" onClick={goToSegment.bind(null, segment.segment_id)}>{segmentName(segment.segment_id)}</td>
                                <td>{segment.points}</td>
                                <td>{secondsToHms(segment.elapsed_time)}</td>
                                <td>{moment(segment.start_date).format('DD.MM.YY')}</td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </Modal>
    );
}

export default withRouter(AthleteDetailsModal);