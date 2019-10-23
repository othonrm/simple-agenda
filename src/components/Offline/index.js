// import React from 'react';
import styled, { keyframes } from 'styled-components';

const Offline = styled.div`
    position: fixed;
    bottom: ${ props => props.online ? '-45px' : '0px'};
    background-color: ${ props => props.online ? '#83eb34' : '#c15959'};
    left: 0;
    height: 45px;
    width: 100%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;

    transition: bottom 0.3s cubic-bezier(1, 0.01, 0.77,-0.08), background-color 0.1s linear;
`;

export default Offline;