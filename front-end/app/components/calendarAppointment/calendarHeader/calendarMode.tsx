'use client';

import { Calendar } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { useCalendarContext } from '..';

export default function CalendarMode() {
    const { mode, setMode } = useCalendarContext();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="capitalize">
                    <Calendar />
                    {mode}
                    <span className="sr-only">Calendar mode</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setMode('MONTH')}>Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMode('WEEK')}>Week</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMode('DAY')}>Day</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
