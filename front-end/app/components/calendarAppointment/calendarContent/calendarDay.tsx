import { differenceInMinutes, format, hoursToMinutes, isSameDay } from 'date-fns';
import { cn } from '~/lib/utils';
import AppointmentBadgeFloating from '../appointmentBadgeFloating';
import CalendarAnimation from '../calendarAnimation';
import { CALENDAR_HEADER_HEIGHT, HOURS_OF_THE_DAY, useCalendarContext } from '..';

function CalendarDayContent() {
    const { date, height, heightPerMinute, data } = useCalendarContext();
    const thisDayAppointmentList = data.filter((app) => isSameDay(date, app.startDate));

    return (
        <div className="grid grid-cols-30 grid-flow-col">
            <div className="col-span-4">
                <div className=" py-2 border-b border-r" style={{ height: CALENDAR_HEADER_HEIGHT + 'px' }} />
                <div className=" grid grid-rows-24 grid-flow-row">
                    {HOURS_OF_THE_DAY.map((hour, index) => (
                        <div
                            key={hour}
                            className={cn(`col-span-2 py-2 text-center text-sm font-light cursor-pointer border-r relative`)}
                            style={{ height: height + 'px' }}
                        >
                            {hour !== 0 && (
                                <div className="absolute w-full text-nowrap top-0 right-0 translate-y-[-50%] text-xs">
                                    {format(new Date().setHours(hour, 0, 0, 0), 'hh a')}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* ---------- */}
            <div className="col-span-26 relative">
                <div>
                    <div
                        className={cn('col-span-4 py-2 text-center text-sm font-light border-b')}
                        style={{ height: CALENDAR_HEADER_HEIGHT + 'px' }}
                    >
                        {format(date, 'eee, dd')}
                    </div>
                    <div className="grid grid-rows-24 grid-flow-row">
                        {HOURS_OF_THE_DAY.map((hour, h_index) => (
                            <div
                                className={cn(`row-span-1 text-center text-sm font-light`, h_index < 23 && 'border-b')}
                                style={{ height: height + 'px' }}
                            />
                        ))}
                    </div>

                    {/* APPOINTMENT */}

                    {thisDayAppointmentList.map((appointment) => {
                        const minutesLength = differenceInMinutes(appointment.endDate, appointment.startDate);
                        const totalMinutesOfStartTime =
                            hoursToMinutes(new Date(appointment.startDate).getHours()) + new Date(appointment.startDate).getMinutes();

                        return (
                            <div>
                                <AppointmentBadgeFloating
                                    {...appointment}
                                    top={CALENDAR_HEADER_HEIGHT + totalMinutesOfStartTime * heightPerMinute}
                                    height={minutesLength * heightPerMinute}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function CalendarDay() {
    return (
        <CalendarAnimation>
            <div className="border rounded-md overflow-hidden">
                <CalendarDayContent />
            </div>
        </CalendarAnimation>
    );
}
