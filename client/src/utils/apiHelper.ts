import apiConfig from "../config/apiConfig.json";
import { Method } from "../types/apiTypes";

const { protocol, domain, port } = apiConfig.localhost;

export const getRequest = async (route: string) => {
    const response = await fetch(`${protocol}://${domain}:${port}${route}`,
    {
        method: Method.GET,
        credentials: 'include'
    });
    const responseBody = await response.json();
    if (responseBody?.errorDetails) {
        throw new Error(responseBody.errorDetails.message);
    }

    return responseBody;
}

export const postRequest = async (route: string, body: any) => {
    const response = await fetch(`${protocol}://${domain}:${port}${route}`,
    {
        method: Method.POST,
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const responseBody = await response.json();
    if (responseBody?.errorDetails) {
        throw new Error(responseBody.errorDetails.message);
    }

    return responseBody;
}