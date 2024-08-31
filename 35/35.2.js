() => {
    const intervalId = setInterval(() => setTime(getLocalTime()), 1000);
    return () => clearInterval(intervalId);
}