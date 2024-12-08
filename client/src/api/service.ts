import api from './api';
import axios from 'axios';

export const getData = async <T>(url: string): Promise<T> => {
  try {
    const response = await api.get<T>(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch data');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const getDataById = async <T>(url: string): Promise<T> => {
  try {
    const response = await api.get<T>(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch data by ID');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const postData = async <T, R>(url: string, payload: T): Promise<R> => {
  try {
    const response = await api.post<R>(url, payload);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to post data');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const updateData = async <T, R>(url: string, payload: T): Promise<R> => {
  try {
    const response = await api.put<R>(url, payload);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to update data');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const deleteData = async <R>(url: string): Promise<R> => {
  try {
    const response = await api.delete<R>(url);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete data');
    }
    throw new Error('An unexpected error occurred');
  }
};
