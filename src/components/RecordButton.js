import { Button } from '@chakra-ui/react';
import { useState } from 'react';

function RecordButton({ startRecord, stopRecord }) {
    const [recording, setRecording] = useState(false);

    const handleClick = () => {
        if (recording) {
            stopRecord();
            setRecording(false);
        } else {
            startRecord();
            setRecording(true);
        }
    };

    return (
        <>
            <Button colorScheme='red' onClick={handleClick}>Record</Button>
        </>
    );
}
  
export default RecordButton;
