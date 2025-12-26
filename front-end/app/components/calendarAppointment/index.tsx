import { createContext, useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import type { AppointmentType, CalendarModeType } from '~/lib/types';
import Loader from '../loader';
import { Calendar } from '../ui/calendar';
import AppointmentForm from './appointmentForm';
import CalendarContent from './calendarContent';
import CalendarHeader from './calendarHeader';
import AddAppointment from './calendarHeader/addAppointment';
import { getAppointment } from '~/api/appointment';
import Detail from './detail';

// CALENDAR CONTEXT TYPE
type CalendarContextType = {
    mode: CalendarModeType;
    setMode: (mode: CalendarModeType) => void | undefined;
    date: Date;
    setDate: (date: Date) => void | undefined;
    height: number;
    setHeight: (height: number) => void;
    heightPerMinute: number;
    setHeightPerMinute: (heightPerMinute: number) => void;
    openDialogForm: boolean;
    setOpenDialogForm: (openDialogForm: boolean) => void;
    data: AppointmentType[];
    setData: (data: AppointmentType[]) => void;
    formData: AppointmentType | undefined;
    setFormData: (formData: AppointmentType | undefined) => void;
    loader: boolean;
    setLoader: (loader: boolean) => void;
    isAdmin: boolean | undefined;
};

// CALENDAR CONTEXT
export const CalendarContext = createContext<CalendarContextType | undefined>(undefined);
export function useCalendarContext() {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error('Context error');
        // return toast("Context error")
    }
    return context;
}

// GLOBAL CONTEXT CONSTANT DATA
export const COLORS = ['#00bcff', '#7c86ff', '#fb64b6', '#ff6467', '#ffba00', '#05df72', '#62748e'];
export const DAYS_OF_THE_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const HOURS_OF_THE_DAY = Array.from({ length: 24 }, (_, i) => i);
export const CALENDAR_HEADER_HEIGHT = 36;

export default function CalendarAppointment({ isAdmin }: { isAdmin: boolean | undefined }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { username } = useParams();
    const _mode = searchParams.get('mode');

    // @ts-ignore
    const [mode, setMode] = useState<CalendarModeType>(_mode || 'MONTH');
    const [date, setDate] = useState<Date>(new Date());
    const [height, setHeight] = useState<number>(60);
    const [heightPerMinute, setHeightPerMinute] = useState<number>(height / 60);
    const [openDialogForm, setOpenDialogForm] = useState<boolean>(false);
    const [formData, setFormData] = useState<AppointmentType>();
    const [data, setData] = useState<AppointmentType[]>([]);
    const [loader, setLoader] = useState(false);

    const handleGet = async () => {
        try {
            setLoader(true);
            const response = await getAppointment(username);
            setData(response.data.data.appointments);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        setSearchParams({ mode });
    }, [mode]);

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <CalendarContext.Provider
            value={{
                date,
                setDate,
                mode,
                setMode,
                height,
                setHeight,
                heightPerMinute,
                setHeightPerMinute,
                openDialogForm,
                setOpenDialogForm,
                data,
                formData,
                setFormData,
                setData,
                loader,
                setLoader,
                isAdmin,
            }}
        >
            {loader && <Loader />}

            {isAdmin ? <Detail /> : <AppointmentForm />}

            <div className="w-full flex p-4 gap-4">
                {!isAdmin && (
                    <div className="md:block hidden">
                        <div className="flex flex-col gap-4 sticky top-4">
                            <AddAppointment />
                            <Calendar mode="single" selected={date} onSelect={setDate} required className="self-start rounded-lg border" />
                        </div>
                    </div>
                )}
                <div className="flex-1 flex flex-col gap-4">
                    <CalendarHeader />
                    <CalendarContent />
                </div>
            </div>
        </CalendarContext.Provider>
    );
}
