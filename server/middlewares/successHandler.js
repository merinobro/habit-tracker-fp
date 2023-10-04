
//^ A utility function for handling successful responses
const successHandler = (res, statusCode, data, length) => {

     // Create a response object with common properties
    const response = {
        message: "success",
        success: true,
        status: statusCode,
        ...(length && { results: length }),
        data,
    };
     // Send the response with the specified status code and response object
    res.status(statusCode).json(response);
};

export default successHandler;
