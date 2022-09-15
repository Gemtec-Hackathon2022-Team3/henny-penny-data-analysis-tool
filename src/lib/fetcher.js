export function fetcher(
    url,
    init = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Connection: 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br',
        },
        mode: 'cors',
        method: 'GET',
    }
) {
    return fetch(url, init).then((res) => {
        return res.json();
    });
}
