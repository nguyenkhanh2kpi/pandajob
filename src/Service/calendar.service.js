import axios, { AxiosError } from "axios";
import { hostName } from "../global";
const API_URL = hostName;


const getMyCalendar = async (token) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(
            `${API_URL}/calendar/my-calendar`,
            config
        );
        return res.data.data;
    } catch (error) {
        const axiosError = error;
        if (
            axiosError &&
            axiosError.response &&
            axiosError.response.status === 403
        ) {
            throw new Error("no_permistion");
        } else {
            throw error;
        }
    }
};

export const calendarService = {
    getMyCalendar,
};
