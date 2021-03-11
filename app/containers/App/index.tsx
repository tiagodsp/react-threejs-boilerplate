import React from 'react';
import LateralNavbar from 'containers/LateralNavbar';
import ContentPanel from 'containers/ContentPanel';
import { Row, Col } from 'react-grid-system';

import style from 'styles/style.scss';

export default class App extends React.Component {
    render() {
        return (
            <div className={style.topContainer}>
                <Row justify="center" gutterWidth={6} style={{ height: '100%' }}>
                    <Col xs="content">
                        <LateralNavbar />
                    </Col>
                    <Col xs={10}>
                        <ContentPanel />
                    </Col>
                </Row>
            </div>
        );
    }
}
