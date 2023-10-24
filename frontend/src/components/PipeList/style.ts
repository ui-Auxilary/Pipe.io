import styled from 'styled-components';

const Container = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: left;
`;

const Row = styled.div`
    margin: 10px;
    width: 75%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #6a6a6a;
`;

const Options = styled.div`
    padding: 5px;
`;

const Delete = styled.button`
    padding: 10px;
    margin: 20px;
    border: none;
    border-radius: 5px;
    height: 40px;
    width: fit-content;
    background: #ff4c4c;
    color: #fff;
    font-weight: 500;
    font-size: 15px;
`;

const SelectAll = styled.button`
    padding: 10px;
    margin: 20px;
    border: none;
    font-weight: 500;
    font-size: 15px;
    border-radius: 5px;
    height: 40px;
    width: fit-content;
    background: #0d6efd;
    color: #fff;
`;

export default {
    Container,
    Delete,
    Options,
    Row,
    SelectAll
}