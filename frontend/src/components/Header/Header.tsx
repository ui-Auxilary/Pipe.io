import { Button } from 'react-bootstrap'
import Switch from 'react-switch'
import S from './styles'
import Sun from 'assets/sun.svg'
import Moon from 'assets/moon.svg'
import { useAppData } from 'helper/AppProvider'

export default function Header({ handleShow }: { handleShow: () => void }) {
    const { darkMode, setDarkMode } = useAppData();
    return (
        <S.Header>
            <S.HeaderWrapper>
                <div style={{ display: "flex", gap: "25px" }}>
                    <h3>Pipeline</h3>
                    <Button onClick={handleShow}>+ Create pipeline</Button>
                </div>
                <span>Create a pipeline</span>
            </S.HeaderWrapper>
            <>
                <Switch
                    onChange={() => setDarkMode(!darkMode)}
                    checked={darkMode}
                    offColor='#FCEEA7'
                    onColor='#382c40'
                    offHandleColor="#EEC61F"
                    onHandleColor="#638cb1"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    uncheckedHandleIcon={<img style={{ padding: '4px', width: '100%' }} src={Sun}></img>}
                    checkedHandleIcon={<img style={{ padding: '6px', width: '100%' }} src={Moon}></img>}
                />
            </>
        </S.Header>
    )
}
