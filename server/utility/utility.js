module.exports = handleError = (errorMessage, statusCode, data = {}) => {
    console.log("error Code--"+ statusCode)
    console.log("Data Code--"+ JSON.stringify(data) )
    const error = new Error(errorMessage);
    error.statusCode=statusCode;
    error.data = data;
    throw error;
}