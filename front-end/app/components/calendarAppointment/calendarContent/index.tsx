import { useCalendarContext } from '..';
import CalendarDay from './calendarDay';
import CalendarMonth from './calendarMonth';
import CalendarWeek from './calendarWeek';

export default function CalendarContent() {
    const { mode } = useCalendarContext();

    if (mode === 'MONTH') return <CalendarMonth />;
    else if (mode === 'WEEK') return <CalendarWeek />;
    return <CalendarDay />;
}
