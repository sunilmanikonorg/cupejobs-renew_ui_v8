import axios from 'axios';

import {appConfig} from "@/config/app";

export const getCurrentFiscalYear = async () => {
  try {
    const response = await axios({
      method: 'get',
      baseURL: appConfig.fastapi.NEXT_PUBLIC_ARMS_HOST,
      url: appConfig.fastapi.CURRENT_FISCAL_YEAR,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.data;
  } catch (error) {
    console.error('Failed to fetch current fiscal year', error);
  }
};

export const getFaculties = async () => {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: appConfig.fastapi.NEXT_PUBLIC_ARMS_HOST,
      url: appConfig.fastapi.CUPE_FACULTY_LIST,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.data;
  } catch (error) {
    console.error('Failed to fetch CUPE faculty list', error);
  }
};

export const getFacultyDepartments = async () => {
  try {
    const response = await axios({
      method: 'get',
      baseURL: appConfig.fastapi.NEXT_PUBLIC_ARMS_HOST,
      url: appConfig.fastapi.CUPE_FACULTY_UNITS,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.data;
  } catch (error) {
    console.error('Failed to fetch CUPE faculty units', error);
  }
};
