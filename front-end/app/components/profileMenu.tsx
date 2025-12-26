'use client';

import { useNavigate, useParams } from 'react-router';

import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';

export default function ProfileMenu() {
    const { username } = useParams();
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <span className="uppercase">{username ? username.substring(0, 2) : 'US'}</span>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/login')}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
