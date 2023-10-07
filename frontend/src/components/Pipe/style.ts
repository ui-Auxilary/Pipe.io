import styled from 'styled-components';

const Edit = styled.img`
    width: 100%;
    cursor: pointer;
`;

const View = styled.img``;

const Left = styled.div`
    display: flex;
    gap: 15px;
`
const Label = styled.div`
    display: flex;
`

const Pipe = styled.li`
    background: #fff;
    display: flex;
    justify-content: space-between;
    width: 75%;
    height: 150px;
    margin: 10px;
    padding: 25px;
    border-radius: 10px;
`;

const Button = styled.button`
    background: #D9D9D9;
    width: 100%;
    padding: 5px 20px;
    border: none;
    margin: 5px;
    font-weight: 600;
`

export default {
    Button,
    Label,
    Edit,
    View,
    Left,
    Pipe
}