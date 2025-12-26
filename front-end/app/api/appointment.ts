import axios from 'axios';
import { SERVER_URL } from '~/lib/constants';
import type { AppointmentType } from '~/lib/types';

export const getAppointment = async (username: string | undefined) => {
    return await axios.get(`${SERVER_URL}/appointment/${username}`);
};

export const createAppointment = async (data: AppointmentType & { username: string | undefined }) => {
    return await axios.post(`${SERVER_URL}/appointment`, data);
};

export const updateAppointment = async (data: AppointmentType & { username: string | undefined; id: string | undefined }) => {
    return await axios.put(`${SERVER_URL}/appointment`, data);
};

export const deleteAppointment = async (id: string | undefined) => {
    return await axios.delete(`${SERVER_URL}/appointment/${id}`);
};
