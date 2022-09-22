import { Button, Tooltip, Icon } from '@chakra-ui/react';
import { useMemo } from 'react';
import useScreenRecorder from '../contexts/ScreenRecorderContext';
import { BsRecordCircle } from 'react-icons/bs';

function RecordButton() {
    const { stream, media, isRecording, startRecording, stopRecording } = useScreenRecorder();

    const handleClick = () => {
        if (!stream) return; 
        if (isRecording) {
            media.stop();
            stopRecording();
        } else {
            media.start();
            startRecording();
        }
    };

    const label = useMemo(() => {
        if (!stream) {
            return 'Select source and start recording';
        } else if (isRecording) {
            return 'Stop recording';
        } else {
            return 'Start recording';
        }
    }, [stream, isRecording]);

    return (
        <Tooltip hasArrow label={label}>
            <Button onClick={handleClick}>
                {
                    isRecording ?
                     <Icon as={BsRecordCircle} boxSize={6} color={'red'}/>
                     : <Icon as={BsRecordCircle} boxSize={6}/>
                }
            </Button>
        </Tooltip>
    );
}
  
export default RecordButton;
