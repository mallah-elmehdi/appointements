import { addDays, format, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useCalendarContext } from '../..';

export default function DaySwipe() {
    const { date, setDate } = useCalendarContext();

    return (
        <div className="flex gap-1 items-center">
            <Button size="icon-sm" className="size-6" variant="outline" onClick={() => setDate(subDays(date, 1))}>
                <ChevronLeft />
            </Button>
            <p className="text-sm font-semibold">{format(date, 'PPP')}</p>
            <Button size="icon-sm" className="size-6" variant="outline" onClick={() => setDate(addDays(date, 1))}>
                <ChevronRight />
            </Button>
        </div>
    );
}
