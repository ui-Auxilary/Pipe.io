import { useFormData } from 'components/MultiStepForm/Form/FormProvider'
import S from './styles'
import axios from "axios";
import { useEffect, useState } from 'react'
import Microservice from 'components/Microservice';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import { useAppData } from 'helper/AppProvider';

export default function ViewMicroservice() {
  const [loading, setLoading] = useState(true);
  const { microserviceData, setMicroserviceData, setStep } = useFormData()
  const [microserviceList, setMicroserviceList] = useState(microserviceData?.["microservices"] ? microserviceData["microservices"] as [] : []);
  const { appFiles } = useAppData();


  useEffect(() => {
    setMicroserviceData({ microservices: microserviceList })
    setLoading(false);
  }, [microserviceList])



  useEffect(() => {
  }, [microserviceData])
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    if (!result.destination ||
      result.destination.index === result.source.index) {
      return;
    }

    const orderedMicroservices = reorder(
      microserviceList,
      result.source.index,
      result.destination.index
    );

    setMicroserviceList(orderedMicroservices);
    setMicroserviceData({ microservices: orderedMicroservices });
  }

  async function readFiles() {
    appFiles?.map(file => {
      if (typeof file !== 'string') {
        const reader = new FileReader();
        reader.readAsBinaryString(file)
        reader.onload = () => {
          const base64data = reader.result;

          if (base64data) {
            axios.post('http://localhost:8000/upload', { 'filename': file.name, 'content': base64data }).then((res) => { setMicroserviceList(prev => [...prev.concat(JSON.parse(res.data)['microservices'] as [never])]) })
          }
        };
      }
    })
  }

  useEffect(() => {
    readFiles();
  }, [])

  const len = microserviceList ? microserviceList.length : 0
  return loading ? null : (
    <S.Wrapper>
      <S.Header>
        <S.Heading>
          <h5>Edit microservices</h5>
          <span style={{ color: '#907f7f' }}>Drag and drop microservices to specify execution order</span>
        </S.Heading>
        <S.Button onClick={() => setStep(2)}>+ Add Microservice</S.Button>
      </S.Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <S.Container ref={provided.innerRef} {...provided.droppableProps}>
              <span style={{ color: "#907F7F", fontWeight: 500 }}>Found {len} microservice(s)</span>
              <S.Scrollbar length={len}>
                {microserviceList && microserviceList.map(({ code, doc, name, parameters, parent_file, output_type }, idx) => {

                  return (
                    <Draggable draggableId={`id-${idx}`} index={idx}>
                      {provided => (
                        <div ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps} >
                          <Microservice code={code} docstring={doc} name={name} param={parameters} parent_file={parent_file} from_pipe={false} output_type={output_type} idx={idx + 1} />
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </S.Scrollbar>
            </S.Container>
          )}
        </Droppable>
      </DragDropContext>
    </S.Wrapper>
  );
}
