import apiClient from "./client";

const endpoint = "/location";

const postLocation = async ({longitude, latitude}, email) => {
    const {data} = await apiClient.post(endpoint,
        {
            email: email,
            longitude: longitude,
            latitude: latitude
        });
        return data;
};

export default postLocation;