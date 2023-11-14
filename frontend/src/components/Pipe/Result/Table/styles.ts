import styled from 'styled-components';

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    margin-top: 20px;
    display: block;
    flex-direction: row;
    justify-content: space-around;
    max-width: 750px;
`;

const Img = styled.img`
    width: 100px;
`;

const Table = styled.table`
    white-space: nowrap;
`;


const TableHead = styled.th`
    border-collapse: collapse;
    border: none;
`;

const TableRow = styled.tr`
    border-collapse: collapse;
    border: none;
    &:nth-child(even) {
        background-color: #eee;
    }
    &:nth-child(odd) {
        background-color: #fff;
    }
`;

const TableData = styled.td`
    border: 1px solid rgb(190, 190, 190);
    padding: 10px;
`;

export default {
    Body,
    Container,
    Img,
    Table,
    TableHead,
    TableRow,
    TableData
}