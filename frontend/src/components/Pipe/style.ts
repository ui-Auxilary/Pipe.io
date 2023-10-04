import styled from 'styled-components';

const Edit = styled.img`
    width: 2%;
    cursor: pointer;

    &:hover {
        stroke: #fff;
    }
`;

const Left = styled.div`

`

const Pipe = styled.li`
    background: #fff;
    display: flex;
    justify-content: space-between;
    width: 80%;
    height: 150px;
    margin: 25px;
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
    Edit,
    Left,
    Pipe
}