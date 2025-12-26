import { type RouteConfig, index, layout, route, prefix } from '@react-router/dev/routes';

export default [
    // index('routes/home.tsx'),
    layout('./layouts/auth.tsx', [route('login', './routes/login.tsx')]),
    layout('./layouts/dashboard.tsx', [
        route('dashboard/:username', './routes/userDashboard.tsx'),
        route('admin/:username', './routes/adminDashboard.tsx'),
    ]),
] satisfies RouteConfig;
