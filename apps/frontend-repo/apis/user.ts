import { User } from "@monorepo/types";
import { apiGetRequest, apiPostRequest } from "@/utils/api-request";

export const fetchUserData = (token: string, id:string) => apiGetRequest(`users/fetch-user-data/${id}`, token);

export const updateUserData = (token: string, data: User) => apiPostRequest("users/update-user-data", token, data);
