export const useFetch = (url, cb) => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        cb && cb(data);
    });
};
