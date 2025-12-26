import { eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { DAYS_OF_THE_WEEK, useCalendarContext } from '..';
import AppointmentBadge from '../appointmentBadge';
import CalendarAnimation from '../calendarAnimation';

function CalendarMonthHeader() {
    return (
        <div className="grid grid-cols-7 divide-x">
            {DAYS_OF_THE_WEEK.map((day) => (
                <div key={day} className="py-2 text-center text-sm font-light border-b">
                    {day}
                </div>
            ))}
        </div>
    );
}

function CalendarMonthContent() {
    const { date, setDate, setMode, data } = useCalendarContext();

    const thisDay = new Date();

    const monthStartDate = startOfMonth(date);
    const monthEndDate = endOfMonth(date);
    const firstMonday = startOfWeek(monthStartDate, { weekStartsOn: 1 });
    const lastSunday = endOfWeek(monthEndDate, { weekStartsOn: 1 });

    const calendarDays = eachDayOfInterval({
        start: firstMonday,
        end: lastSunday,
    });

    return (
        <div className="grid grid-cols-7 grid-flow-row grid-rows-5 ">
            {calendarDays.map((calendarDay, index) => {
                // STYLING
                const sameMonth = isSameMonth(calendarDay, date);
                const sameDay = isSameDay(calendarDay, thisDay);

                // APPOINTMENTS FILTER
                const thisDayAppointmentList = data.filter((app) => isSameDay(calendarDay, app.startDate));

                return (
                    <div
                        key={calendarDay.toISOString()}
                        onClick={(e) => {
                            e.stopPropagation();
                            setDate(calendarDay);
                            setMode('DAY');
                        }}
                        className={cn(
                            'p-2 text-center text-sm font-light cursor-pointer aspect-square',
                            !sameMonth && 'bg-muted',
                            !sameMonth && index === calendarDays.length - 1 && 'rounded-br-md',
                            index < calendarDays.length - 7 && 'border-b',
                            (index + 1) % 7 && 'border-r'
                        )}
                    >
                        <div className="flex flex-col gap-1 overflow-hidden">
                            <div
                                className={cn(
                                    'size-6 rounded-full self-center flex items-center justify-center ',
                                    sameDay && 'bg-primary text-primary-foreground'
                                )}
                            >
                                {format(calendarDay, 'd')}
                            </div>
                            {thisDayAppointmentList.slice(0, 2).map((appointment) => (
                                <AppointmentBadge {...appointment} />
                            ))}
                            {thisDayAppointmentList.length > 2 && (
                                <Button size="sm" variant="link" className="text-[10px]">
                                    +{thisDayAppointmentList.length - 2} more
                                </Button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default function CalendarMonth() {
    return (
        <CalendarAnimation>
            <div className="border rounded-md overflow-hidden">
                <CalendarMonthHeader />
                <CalendarMonthContent />
            </div>
        </CalendarAnimation>
    );
}
