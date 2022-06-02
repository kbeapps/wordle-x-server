module.exports = (source: string, err: object | string) => {
    const error = {
        source: source,
        error: err
    };

    console.log(error);
};