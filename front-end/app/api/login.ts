import axios from 'axios';
import { SERVER_URL } from '~/lib/constants';
import type { AppointmentType } from '~/lib/types';

export const logIn = async (username: string | undefined) => {
    return await axios.get(`${SERVER_URL}/user/${username}`);
};