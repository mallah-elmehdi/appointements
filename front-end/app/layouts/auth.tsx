import { Outlet } from 'react-router';

export default function Auth() {
    return (
        <div className="min-w-screen min-h-screen flex justify-center items-center p-4">
            <Outlet />
        </div>
    );
}
