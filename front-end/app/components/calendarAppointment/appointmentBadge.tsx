import { format } from 'date-fns';
import type { AppointmentType } from '~/lib/types';
import { Badge } from '../ui/badge';

export default function AppointmentBadge({ title, description, startDate, endDate, color }: AppointmentType) {
    return (
        <Badge
            className="w-full"
            style={{
                backgroundColor: color + '4D',
            }}
        >
            <span className="truncate text-xs">{title}</span>
            <span className="text-md font-bold">{format(startDate, 'hh:mm a')}</span>
        </Badge>
    );
}
