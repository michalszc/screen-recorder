import { Button, Tooltip, Icon } from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { BsRecordCircle } from 'react-icons/bs';

function RecordButton({ startRecord, stopRecord, isStream }) {
    const [recording, setRecording] = useState(false);

    const handleClick = () => {
        if (!isStream) return; 
        if (recording) {
            stopRecord();
            setRecording(false);
        } else {
            startRecord();
            setRecording(true);
        }
    };

    const label = useMemo(() => {
        if (!isStream) {
            return 'Select source and start recording';
        } else if (recording) {
            return 'Stop recording';
        } else {
            return 'Start recording';
        }
    }, [isStream, recording]);

    return (
        <Tooltip hasArrow label={label}>
            <Button onClick={handleClick}>
                {
                    recording ?
                     <Icon as={BsRecordCircle} boxSize={6} color={'red'}/>
                     : <Icon as={BsRecordCircle} boxSize={6}/>
                }
            </Button>
        </Tooltip>
    );
}
  
export default RecordButton;
