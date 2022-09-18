import { useRef, useEffect } from 'react';
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
            <video ref={videoNode}/>
        </>
    );
}

Video.propTypes = {
    source: string
};

export default Video;
