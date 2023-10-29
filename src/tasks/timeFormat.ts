export default (seconds: number) => {
    let time = "";
    if (Math.floor(seconds / 604800) > 0) {
        time = `${Math.floor(seconds / 604800)} week${Math.floor(seconds / 604800) != 1 ? "s" : ""}`;
    } else if (Math.floor(seconds / 86400) > 0) {
        time = `${time}${Math.floor(seconds / 86400)} day${Math.floor(seconds / 86400) != 1 ? "s" : ""}`;
    } else if (Math.floor(seconds / 3600) > 0) {
        time = `${time}${Math.floor(seconds / 3600)} hour${Math.floor(seconds / 3600) != 1 ? "s" : ""}`;
    } else if (Math.floor(seconds / 60) > 0) {
        time = `${time}${Math.floor(seconds / 60)} minute${Math.floor(seconds / 60) != 1 ? "s" : ""}`;
    } else if (seconds >= 0) {
        time = `${time}${seconds} second${seconds != 1 ? "s" : ""}`;
    }
    return time;
}