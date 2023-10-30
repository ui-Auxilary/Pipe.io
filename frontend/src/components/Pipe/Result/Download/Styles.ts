import styled from 'styled-components';

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    max-width: 750px;
`;

const Img = styled.img`
    width: 100px;

`;

export default {
    Body,
    Container,
    Img,
}