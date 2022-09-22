import { useState, useEffect } from 'react';
import { Divider, Select, Center, HStack, VStack } from '@chakra-ui/react';
import useScreenRecorder from '../contexts/ScreenRecorderContext';
import Video from './Video';
import ThemeButton from './ThemeButton';
import RecordButton from './RecordButton';
import Timer from './Timer';

const { ipcRenderer } = window.require('electron');
const { writeFile } = window.require('fs');

function App() {
  const [sources, setSources] = useState([]);
  const { stream, setSource, setMedia } = useScreenRecorder();

  const recordedChunks = [];

  // Captures all recorded chunks
  const handleDataAvailable = (e) => recordedChunks.push(e.data);

  // Saves the video file on stop
  const handleStop = () => {
    ipcRenderer.send('SHOW_SAVE_DIALOG');
    ipcRenderer.once('FILE_PATH', async (event, filePath) => {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm; codecs=vp9'
      });
  
      const buffer = Buffer.from(await blob.arrayBuffer());

      if (filePath) {
        writeFile(filePath, buffer, () => recordedChunks.splice(0, recordedChunks.length));
      }
    });
  };

  useEffect(() =>{
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm; codecs=vp9'
      });

      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.onstop = handleStop;

      setMedia(mediaRecorder);
    } else {
      setMedia(null);
    }
  }, [stream]);

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
          <Video />
          <Divider margin='20px' maxWidth={'90%'}/>    
          <HStack spacing='24px'>
            <Timer />
            <RecordButton />
            <Select 
              placeholder='Select source'
              onClick={() => getVideoSources()}
              onChange={e => setSource(e.target.value)}
            >
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
