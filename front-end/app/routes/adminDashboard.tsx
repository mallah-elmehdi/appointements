import { Calendar, User } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '~/components/ui/card';
import type { Route } from './+types/adminDashboard';
import CalendarAppointment from '~/components/calendarAppointment';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Calendar | Clean and Seal Dental' },
        { name: 'description', content: 'Welcome to Clean and Seal Dental booking system!' },
    ];
}

export default function AdminDashboard() {
    return (
        <div className="w-full">
            <div className="grid gap-4 grid-flow-col grid-cols-9 p-4">
                <div className="col-span-3">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-1">
                                <Calendar />
                                <CardTitle>Upcoming Appointments</CardTitle>
                            </div>
                            <p
                                className="font-bold"
                                style={{
                                    fontSize: '50px',
                                }}
                            >
                                10
                            </p>
                        </CardHeader>
                    </Card>
                </div>
                <div className="col-span-3">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-1">
                                <User />
                                <CardTitle>Users</CardTitle>
                            </div>
                            <p
                                className="font-bold"
                                style={{
                                    fontSize: '50px',
                                }}
                            >
                                192
                            </p>
                        </CardHeader>
                    </Card>
                </div>
            </div>
            <CalendarAppointment isAdmin={true} />
        </div>
    );
}
