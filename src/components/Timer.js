import { Center, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
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
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        if (isRecording && !isRunning) {
            start();
            setStartDate(new Date());
        } else {
            window.duration = new Date().getTime() - startDate.getTime();
            reset(null, false);
        }
    }, [isRecording]);
    
    return (
        <Center>
            <Text>
                {formatTime({seconds, minutes, hours, days})}
            </Text>
        </Center>
    );
}
  
export default Timer;
