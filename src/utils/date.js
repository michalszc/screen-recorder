/**
 * Add 0 before x if passed number is less than 10
 * @param {Number} x 
 * @returns {String}
 */
export function addZero(x) {
    if (x < 10) {
        return '0'+x;
    }

    return x;
}

/**
 * 
 * @param {Object} - seconds, minutes, hours, days
 * @returns {String}
 */
export function formatTime({seconds, minutes, hours, days}) {
    if (days !== 0) {
        return `${days}:${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
    } else if (hours !== 0) {
        return `${hours}:${addZero(minutes)}:${addZero(seconds)}`;
    } else {
        return `${addZero(minutes)}:${addZero(seconds)}`;
    }
}

/**
 * Converts string passed as hh:mm:ss.ms to milliseconds
 * @param {String} time 
 * @returns {Number}
 */
export function convertTime(time) {
    const hms = time.split(/[.:]/);

    return (+hms[0]) * 60 * 60 * 1000 + (+hms[1]) * 60 * 1000 + (+hms[2]) * 1000 + (+hms[3]);
}
