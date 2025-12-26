export type AppointmentType = {
    title: string;
    description: string;
    color: string;
    startDate: Date;
    endDate: Date;
    user?: UserType;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
};

export type UserType = {
    _id: string;
    name: string;
    phone: string;
    username: string;
    role: 'ADMIN' | 'USER';
    createdAt: string;
    updatedAt: string;
};

export type CalendarModeType = 'MONTH' | 'WEEK' | 'DAY';

export type ResponseType = {
    message: string;
    data: {
        appointments: AppointmentType[];
    };
};
