import styled from 'styled-components';

const handleColorType = (status: string) => {
    switch (status) {
        case "Running":
            return "#CACACA";
        case "Error":
            return "#CE3390";
        case "Completed":
            return "#9CC7A3";
        default:
            return "#573BFE";
    }
};

const Edit = styled.img`
    cursor: pointer;
    position: absolute;
    right: 1em;
    top: 1em;
    width: 1.6%;
`;

const View = styled.img``;

const Left = styled.div`
    display: flex;
    gap: 15px;
`

const Pipe = styled.li`
    position: relative;
    background: #fff;
    justify-content: space-between;
    width: 75%;
    height: 150px;
    margin: 10px;
    border-radius: 10px;
    flex-direction: column;
    list-style: none;
`;

const Button = styled.button`
    background: #573BFE;
    width: 150px;
    height: 40px;
    padding: 5px 20px;
    border: none;
    border-radius: 5px;
    margin: 5px;
    font-weight: 600;
    color: #FFF;
`

interface Props {
    status: string
}

const Execute = styled.button<Props>`
    background: ${({ status }) => handleColorType(status)};
    width: 150px;
    height: 40px;
    padding: 5px 20px;
    border: none;
    border-radius: 5px;
    margin: 5px;
    font-weight: 600;
    color: #FFF;
`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 25px 25px 0px 25px;
`

const Bottom = styled.div`
    display: flex;
    width: 100%;
    background: #F9FAFF;
    border-radius: 0px 0px 10px 10px;
    height: 50px;
    padding: 10px 25px;
    gap: 10px;
    align-items: flex-end;
    bottom: 0;
    position: absolute;
`
const Status = styled.div<Props>`
    background: ${({ status }) => handleColorType(status)};
    width: 130px;
    height: 30px;
    color: #FFF;
    padding: 2px 5px;
    margin: auto 2px;
    text-align: center;
    font-size: 15px;
`;

const Label = styled.h6`
    font-weight: 400;
    font-size: 15px;
`;

const EditBox = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
`;

const EditOption = styled.li`
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    font-weight: 500;
    gap: 12px;

    &: hover {
        border-radius: 5px;
        padding: 5px;
        background: rgba(0, 191, 255, 0.2);
        cursor: pointer;
    }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`
const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
`;
const Checkbox = styled.input.attrs({
    type: 'checkbox'
})`
    display: ${props => props.checked ? 'inline-block' : 'none'};;
    width: 1em;
    height: 1em;
    background: ${props => props.checked ? '#fff' : '#000'};
    border: none; 
    border: solid 1px #ccc;
    border-radius: 10px;
  transition: all 150ms;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Pipe}:hover & {
    display: inline-block;
  }
`

export default {
    Button,
    CheckboxContainer,
    Checkbox,
    Edit,
    EditOption,
    EditBox,
    Execute,
    View,
    Left,
    Pipe,
    Top,
    Bottom,
    Status,
    Label
}