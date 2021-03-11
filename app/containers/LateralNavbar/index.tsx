// Imports
import React from 'react';
import styled from 'styled-components';

import { Container, Row, Col } from 'react-grid-system';
import {
    Card,
    Button,
    Icon,
    IconName,
    Text,
} from '@blueprintjs/core';

// CSS
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import style from './styles/style.scss';

const WelcomeCard: React.FunctionComponent<{
    icon: IconName;
    title: string;
    href: string;
    sameTab?: boolean;
}> = (props) => (
    <a href={props.href} target={props.sameTab ? '' : '_blank'}>
        <Card interactive className={style.navbarButton}>
            <Icon icon={props.icon} iconSize={40} />
            <Text>{props.title}</Text>
            {props.children}
        </Card>
    </a>
);

const NavBarButton = styled(Button);
export default class LateralNavbar extends React.Component {
    render() {
        return (
            <Card className={style.navbar}>
                <WelcomeCard href="" icon="home" title="Home" sameTab />
                <WelcomeCard href="" icon="star" title="Button 0" sameTab />
                <WelcomeCard href="" icon="star" title="Button 1" sameTab />
                <WelcomeCard href="" icon="star" title="Button 2" sameTab />
            </Card>
        );
    }
}
