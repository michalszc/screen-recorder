import { useRef, useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { object } from 'prop-types';

function Video({ stream }) {
    const videoNode = useRef(null);

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

Video.propTypes = {
    stream: object
};

export default Video;
