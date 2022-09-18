import { useState, useEffect } from 'react';
import { Divider, Select, Center, HStack, VStack } from '@chakra-ui/react';
import Video from './Video';
import ThemeButton from './ThemeButton';
import RecordButton from './RecordButton';

const { ipcRenderer  } = window.require('electron');

function App() {
  const [sources, setSources] = useState([]);
  const [source, setSource] = useState(null);

  const getVideoSources = () => ipcRenderer.send('GET_SOURCES');

  useEffect(() => {
    ipcRenderer.on('SET_SOURCES', async (event, newSources) => {
      setSources(newSources);
    });
    getVideoSources();
  }, []);

  return (
    <>
      <ThemeButton />
      <Center>
        <VStack width={'100%'}>
          <Video source={source}/>
          <Divider margin='20px' maxWidth={'90%'}/>    
          <HStack spacing='24px'>
            <RecordButton />
            <Select placeholder='Select file type' maxWidth={'200px'}>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
            <Select placeholder='Select source' onChange={e => setSource(e.target.value)}>
              {sources.map(({ id, name }) => 
                <option key={id} value={id}>{name}</option>
              )}
            </Select>
          </HStack>
        </VStack>
      </Center>
    </>
  );
}

export default App;
