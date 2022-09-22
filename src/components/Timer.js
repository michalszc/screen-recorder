import { Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import useScreenRecorder from '../contexts/ScreenRecorderContext';
import { formatTime } from '../utils/date';

function Timer() {
    const {
        seconds, minutes, hours,
        days, isRunning,
        start, reset
    } = useStopwatch({ autoStart: false });
    const { isRecording } = useScreenRecorder();
    
    useEffect(() => {
        if (isRecording && !isRunning) {
            start();
        } else {
            reset(null, false);
        }
    }, [isRecording]);
    
    return (
        <Text>
            {formatTime({seconds, minutes, hours, days})}
        </Text>
    );
}
  
export default Timer;
