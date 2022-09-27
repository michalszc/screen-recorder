import { useState, useEffect } from 'react';
import { Divider, Select, Center, Stack, VStack, Progress } from '@chakra-ui/react';
import useScreenRecorder from '../contexts/ScreenRecorderContext';
import Video from './Video';
import ThemeButton from './ThemeButton';
import RecordButton from './RecordButton';
import Timer from './Timer';
import createVideoFile from '../utils/ffmpegHelpers';

const { ipcRenderer } = window.require('electron');

function App() {
  const [sources, setSources] = useState([]);
  const { stream, progress, setSource, setMedia, setProgress } = useScreenRecorder();

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
        await createVideoFile(buffer, filePath, setProgress);
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
          {progress !== 0 && <Progress isAnimated hasStripe value={progress} w={'80%'} maxW={'520px'}/>}
          <Stack
            direction={['column', 'row']}
            spacing={'24px'}
            wrap={true}
            maxW={'80%'}
          >
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
          </Stack>
        </VStack>
      </Center>
    </>
  );
}

export default App;
