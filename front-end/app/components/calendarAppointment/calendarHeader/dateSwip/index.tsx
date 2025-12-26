import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { Button } from '~/components/ui/button';
import { useCalendarContext } from '../..';
import { format, addDays, subDays } from 'date-fns';
import MonthSwipe from './monthSwip';
import DaySwipe from './daySwip';

export default function DateSwipe() {
    const { mode } = useCalendarContext();

    return mode === 'MONTH' ? <MonthSwipe /> : <DaySwipe />;
}
