import axios from 'axios';

import { appConfig } from "@/config/app";

export const getNotifications = async (access_token) => {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: appConfig.fastapi.NEXT_PUBLIC_CUPEJOBS_HOST,
      url: appConfig.fastapi.NOTIFICATIONS,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access_token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get user notifications.');
    throw error;
  }
};
