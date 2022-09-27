import { Button, Tooltip, Icon } from '@chakra-ui/react';
import { useMemo } from 'react';
import useScreenRecorder from '../contexts/ScreenRecorderContext';
import { BsRecordCircle } from 'react-icons/bs';

function RecordButton() {
    const { stream, media, progress, isRecording, startRecording, stopRecording } = useScreenRecorder();

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
        } else if (progress !== 0) {
            return 'Wait until encoding is finished';  
        } else if (isRecording) {
            return 'Stop recording';
        } else {
            return 'Start recording';
        }
    }, [stream, isRecording, progress]);

    return (
        <Tooltip hasArrow label={label}>
            <Button onClick={handleClick} disabled={progress !== 0}>
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
