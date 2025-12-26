import AddAppointment from './addAppointment';
import CalendarMode from './calendarMode';
import DateSwipe from './dateSwip';
import TodayIcon from './todayIcon';

export default function CalendarHeader() {
    return (
        <div className="flex sm:flex-row flex-col md:items-center justify-between gap-4">
            <div className="flex gap-4 items-center">
                <TodayIcon />
                <DateSwipe />
            </div>
            <div className="flex items-center sm:justify-end justify-between gap-2">
                <CalendarMode />
                <div className="md:hidden">
                    <AddAppointment />
                </div>
            </div>
        </div>
    );
}
