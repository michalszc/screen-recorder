import { useRef, useEffect } from 'react';
import useScreenRecorder from '../contexts/ScreenRecorderContext';
import { Box, useColorModeValue } from '@chakra-ui/react';

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
            maxW={'2xl'}
            mb={'25px'}
            bg={bg}
            textAlign={'center'}
            position={'relative'}
        >
            {!stream &&
                <span
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >NO VIDEO SOURCE</span>
            }
            <video ref={videoNode} />
        </Box>
    );
}

export default Video;
