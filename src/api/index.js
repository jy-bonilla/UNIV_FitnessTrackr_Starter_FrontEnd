const { REACT_APP_BASE_URL } = process.env;

export const fetchRoutines = async () => {
    try {
      const { data } = await fetch(`${REACT_APP_BASE_URL }/routines`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

export const callApi = async ({ url, method, token, body }) => {
    try {

        const options = {
            method: method ? method.toUpperCase() : 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(REACT_APP_BASE_URL + url, options);
        const data = await response.json();
        if (data.error) throw data.error;
        console.log(data)
        return data;
    } catch (error) {
        console.error('ERROR: ', error);
        return error
    }

    
}