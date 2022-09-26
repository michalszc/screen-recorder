import { useRef, useEffect } from 'react';
import useScreenRecorder from '../contexts/ScreenRecorderContext';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

function Video() {
    const { stream, source, media, setStream, stopRecording } = useScreenRecorder();
    const videoNode = useRef(null);

    useEffect(() => {
        if (media?.state === 'recording') {
            media.stop();
        }
        if (source) {
          const createStream = async () => {
            const constraints = {
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: source
                }
              }
            };
            setStream(await navigator.mediaDevices
              .getUserMedia(constraints));
          };
          createStream();
        } else {
            setStream(null);
        }
        stopRecording();
      }, [source]);

    useEffect(() => {
        if (videoNode.current && stream) {
            videoNode.current.srcObject = stream;
            videoNode.current.play();
        } else if (videoNode.current) {
            videoNode.current.srcObject = null;
        }
    }, [videoNode, stream]);

    const bg = useColorModeValue('gray.100', 'whiteAlpha.200');

    return (
        <Box
            minW={'300px'}
            maxW={'full'}
            minH={'150px'}
            maxH={'70vh'}
            mb={'25px'}
            bg={bg}
            textAlign={'center'}
            position={'relative'}
            zIndex={0}
        >
            <Text
                position={"absolute"}
                top={'50%'}
                left={'50%'}
                transform={'translate(-50%, -50%)'}
                zIndex={'hide'}
            >NO VIDEO SOURCE</Text>
            <video ref={videoNode} style={{ maxHeight: 'inherit' }}/>
        </Box>
    );
}

export default Video;
