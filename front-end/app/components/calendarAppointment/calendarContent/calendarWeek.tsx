import { addDays, differenceInMinutes, format, hoursToMinutes, isSameDay, startOfWeek } from 'date-fns';
import { cn } from '~/lib/utils';
import { CALENDAR_HEADER_HEIGHT, HOURS_OF_THE_DAY, useCalendarContext } from '..';
import AppointmentBadgeFloating from '../appointmentBadgeFloating';
import CalendarAnimation from '../calendarAnimation';

function CalendarWeekContent() {
    const { date, height, heightPerMinute, data } = useCalendarContext();

    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    return (
        <div className="grid grid-cols-30 grid-flow-col">
            {/* HOURS */}
            <div className="col-span-2">
                <div className=" py-2 border-b border-r" style={{ height: CALENDAR_HEADER_HEIGHT + 'px' }} />
                <div className=" grid grid-rows-24 grid-flow-row">
                    {HOURS_OF_THE_DAY.map((hour) => (
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
            {/* ------------- */}
            {weekDays.map((day, index) => {
                // APPOINTMENTS FILTER
                const thisDayAppointmentList = data.filter((app) => isSameDay(day, app.startDate));

                return (
                    <div className="col-span-4 relative">
                        <div>
                            <div
                                key={day.toISOString()}
                                className={cn('col-span-4 py-2 text-center text-sm font-light border-b', index < 6 && 'border-r')}
                                style={{ height: CALENDAR_HEADER_HEIGHT + 'px' }}
                            >
                                {format(day, 'eee, dd')}
                            </div>
                            <div className="grid grid-rows-24 grid-flow-row">
                                {HOURS_OF_THE_DAY.map((hour, h_index) => (
                                    <div
                                        key={day.toISOString()}
                                        className={cn(
                                            `row-span-1 text-center text-sm font-light`,
                                            index < 6 && 'border-r',
                                            h_index < 23 && 'border-b'
                                        )}
                                        style={{ height: height + 'px' }}
                                    />
                                ))}
                            </div>

                            {/* APPOINTMENT */}

                            {thisDayAppointmentList.map((appointment) => {
                                const minutesLength = differenceInMinutes(appointment.endDate, appointment.startDate);
                                const totalMinutesOfStartTime =
                                    hoursToMinutes(new Date(appointment.startDate).getHours()) +
                                    new Date(appointment.startDate).getMinutes();

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
                );
            })}
        </div>
    );
}

export default function CalendarWeek() {
    return (
        <CalendarAnimation>
            <div className="border rounded-md overflow-hidden">
                <CalendarWeekContent />
            </div>
        </CalendarAnimation>
    );
}
