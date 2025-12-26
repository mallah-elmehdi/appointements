import CalendarAppointment from '~/components/calendarAppointment';
import type { Route } from './+types/userDashboard';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Calendar | Clean and Seal Dental' },
        { name: 'description', content: 'Welcome to Clean and Seal Dental booking system!' },
    ];
}

export default function UserDashboard() {
    return (
        <div className="w-full">
            <CalendarAppointment />
        </div>
    );
}
