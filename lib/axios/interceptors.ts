import instance from "./config";

// const interceptor = () => {
  // REQUEST INTERCEPTOR
  instance.interceptors.request.use((config) => {
    return config;
  });

  // RESPONSE INTERCEPTOR
  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const { response, code } = error;

      let payload = {
        statusCode: 0,
        message: "Ha ocurrido un error inesperado...",
        error: "Error",
      };

      let data = payload;
      
      if (response != undefined)
        data = response!.data;

      // Errores de Axios
      if (code == "ERR_NETWORK") {
        payload.error = "Error";
        payload.message = "Se perdió la conexión a Internet";
        payload.statusCode = 12004;
      }

      // Errores controlados del back
      // UNAUTHORIZED
      if (data.statusCode >= 400 && data.statusCode <= 499) {
        payload.error = data.error;
        payload.message = data.message;
        payload.statusCode = data.statusCode;

        return Promise.reject(data);
      }

      return Promise.reject(error);
    }
  );
// };

// export default interceptor;
