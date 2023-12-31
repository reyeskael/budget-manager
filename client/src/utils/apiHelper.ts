import apiConfig from "../config/apiConfig.json";
import { Method } from "../types/apiTypes";

const { protocol, domain, port } = apiConfig.localhost;

export const getRequest = async (route: string, param = "") => {
    const response = await fetch(`${protocol}://${domain}:${port}${route}${param}`,
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

export const patchRequest = async (route: string, _id: string, body: any) => {
    const response = await fetch(`${protocol}://${domain}:${port}${route}/${_id}`,
    {
        method: Method.PATCH,
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

export const deleteRequest = async (route: string, _id: string) => {
    const response = await fetch(`${protocol}://${domain}:${port}${route}/${_id}`,
    {
        method: Method.DELETE,
        credentials: 'include'
    });
    const responseBody = await response.json();
    if (responseBody?.errorDetails) {
        throw new Error(responseBody.errorDetails.message);
    }

    return responseBody;
}