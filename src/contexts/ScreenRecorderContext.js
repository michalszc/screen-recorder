import { createContext, useReducer, useContext } from "react";
import screenRecorderReducer, { initialState } from '../reducers/screenRecorderReducer';
import ActionTypes from "../constants/ActionTypes";

const ScreenRecorderContext = createContext(initialState);

export const ScreenRecorderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(screenRecorderReducer, initialState);

    const setStream = (stream) => {
        dispatch({
            type: ActionTypes.SET_STREAM,
            payload: {
                stream
            }
        });
    };

    const setSource = (source) => {
        dispatch({
            type: ActionTypes.SET_SOURCE,
            payload: {
                source
            }
        });
    };

    const setMedia = (media) => {
        dispatch({
            type: ActionTypes.SET_MEDIA,
            payload: {
                media
            }
        });
    };

    const setProgress = (progress) => {
        dispatch({
            type: ActionTypes.SET_PROGRESS,
            payload: {
                progress
            }
        });
    };

    const setExtension = (extension) => {
        dispatch({
            type: ActionTypes.SET_EXTENSION,
            payload: {
                extension
            }
        });
    };

    const toggleAudio = () => {
        dispatch({
            type: ActionTypes.TOGGLE_AUDIO
        });
    };

    const startRecording = () => {
        dispatch({
            type: ActionTypes.START_RECORDING
        });
    };

    const stopRecording = () => {
        dispatch({
            type: ActionTypes.STOP_RECORDING
        });
    };

    const value = {
        stream: state.stream,
        source: state.source,
        media: state.media,
        progress: state.progress,
        extension: state.extension,
        isRecording: state.isRecording,
        audio: state.audio,
        setStream,
        setSource,
        setMedia,
        setProgress,
        setExtension,
        toggleAudio,
        startRecording,
        stopRecording
    };

    return (
        <ScreenRecorderContext.Provider value={value}>
            {children}
        </ScreenRecorderContext.Provider>
    );
};

const useScreenRecorder = () => {
  const context = useContext(ScreenRecorderContext);

  if (context === undefined) {
    throw new Error("useScreenRecorder must be used within ScreenRecorderContext");
  }

  return context;
};

export default useScreenRecorder;
