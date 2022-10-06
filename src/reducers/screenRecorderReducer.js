import ActionTypes from "../constants/ActionTypes";

export const initialState = {
    stream: null,
    source: null,
    media: null,
    progress: 0,
    extension: 'webm',
    isRecording: false,
    audio: true
  };
  
const screenRecorderReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case ActionTypes.SET_STREAM:

        return {
            ...state,
            stream: payload.stream
        };
        case ActionTypes.SET_SOURCE:

        return {
            ...state,
            source: payload.source
        };
        case ActionTypes.SET_MEDIA:

        return {
            ...state,
            media: payload.media
        };
        case ActionTypes.SET_PROGRESS:

        return {
            ...state,
            progress: payload.progress
        };
        case ActionTypes.SET_EXTENSION:

        return {
            ...state,
            extension: payload.extension
        };
        case ActionTypes.TOGGLE_AUDIO:

        return {
            ...state,
            audio: !state.audio
        };
        case ActionTypes.START_RECORDING:

        return {
            ...state,
            isRecording: true
        };
        case ActionTypes.STOP_RECORDING:

        return {
            ...state,
            isRecording: false
        };
        default:

        return {
            state
        };
    }
  };
  
  export default screenRecorderReducer;
