import { axiosInstance } from "../axiosInstance";

const api = {
    get: async <T>(args: any): Promise<T> => {
        const { url, config } = args;

        return axiosInstance.get(url, { ...config }).then((response) => response.data);
    },
    post: async <T, R>(args: any): Promise<R> => {
        const { url, config, data } = args;
        return axiosInstance.post(url, { ...data }, { ...config }).then((response) => response.data);
    },
    update: async <T>(args: any): Promise<T> => {
        const { url, config, data } = args;
        return axiosInstance.put(url, { ...data }, { ...config }).then((response) => response.data);
    },
    delete: async <T>(args: any): Promise<T> => {
        const { url, config } = args;
        return axiosInstance.delete(url, { ...config }).then((response) => response.data);
    },
}
export { api }