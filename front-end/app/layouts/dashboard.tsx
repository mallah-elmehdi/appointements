import { Outlet } from 'react-router';
import Header from '~/components/header';

export default function DashboardLayout() {
    return (
        <div className="min-w-screen min-h-screen flex flex-col items-start">
            <Header />
            <Outlet />
        </div>
    );
}
