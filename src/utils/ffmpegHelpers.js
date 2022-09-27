import { convertTime } from './date';
const { path: ffmpegPath } = window.require('@ffmpeg-installer/ffmpeg');
const fluentFfmpeg = window.require('fluent-ffmpeg');
const stream = window.require('stream');

export function loadffmpeg() {
    const ffpmeg = new fluentFfmpeg();

    ffpmeg.setFfmpegPath(
        ffmpegPath.replace('app.asar', 'app.asar.unpacked')
    );

    return ffpmeg;
}


export function createReadableVideoBuffer(videoBuffer) {
    const readableVideoBuffer = new stream.PassThrough();

    readableVideoBuffer.end(videoBuffer);

    return readableVideoBuffer;
}

export default async  function createVideoFile(videoBuffer, filePath, setProgress) {
    const ffmpeg = loadffmpeg();
    const readableVideoBuffer = createReadableVideoBuffer(videoBuffer);

    const duration = window.duration;

    await ffmpeg
        .input(readableVideoBuffer)
        .output(filePath)
        .withNoAudio()
        // eslint-disable-next-line no-console
        .on('start', () => console.log('start'))
        .on('progress', progress => {
            const time = convertTime(progress.timemark);
            const percent = +((time / duration) * 100).toFixed(2);
            setProgress(percent);
        })
        .on('end', () => {
            // eslint-disable-next-line no-console
            console.log('stop');
            setProgress(100);
            setTimeout(() =>  setProgress(0), 400);
        })
        .on('error', (err) => {
            // eslint-disable-next-line no-console
            console.log('Something went wrong. Cannot process video: ' + err.message);
            setProgress(0);
        })
        .run();    
  }
