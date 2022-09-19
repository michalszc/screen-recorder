import { useRef, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { string } from 'prop-types';

function Video({ source }) {
    const videoNode = useRef(null);

    useEffect(() => {
        if (videoNode.current && source) {
            const create = async () => {
                const constraints = {
                    audio: false,
                    video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: source
                        }
                    }
                };
                const stream = await navigator.mediaDevices
                    .getUserMedia(constraints);
                videoNode.current.srcObject = stream;
                videoNode.current.play();
            };
            create();
        } else if (videoNode.current) {
            videoNode.current.srcObject = null;
        }
    }, [videoNode, source]);

    return (
        <>
            <Box
                maxW={'2xl'}
                mb={'25px'}
                bg={'#ccc'}
                textAlign={'center'}
                verticalAlign={'center'}
                position={'relative'}
                color={'#969696'}
            >
                {!source &&
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
        </>
    );
}

Video.propTypes = {
    source: string
};

export default Video;
