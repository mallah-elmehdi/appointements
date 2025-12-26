import { format } from 'date-fns';
import type { AppointmentType } from '~/lib/types';
import { cn } from '~/lib/utils';
import { useCalendarContext } from '.';

type AppointmentBadgeFloatingType = AppointmentType & {
    top: number;
    height: number;
};

export default function AppointmentBadgeFloating(appointment: AppointmentBadgeFloatingType) {
    const { title, description, startDate, endDate, color, top = 9, height = 10, _id } = appointment;
    const { openDialogForm, setOpenDialogForm, setFormData } = useCalendarContext();

    const handleClick = () => {
        setFormData(appointment);
        setOpenDialogForm(!openDialogForm);
    };

    return (
        <div
            className={cn(`w-full rounded-md absolute p-1 overflow-hidden cursor-pointer`)}
            style={{
                backgroundColor: color + '4D',
                height: height + 'px',
                top: top + 'px',
            }}
            onClick={handleClick}
        >
            <p className="text-xs mb-1 font-semibold text-nowrap">
                {format(startDate, 'hh:mm a')} - {format(endDate, 'hh:mm a')}
            </p>
            <p className="text-xs font-medium text-wrap mb-1">{title}</p>
            <p className="text-xs text-wrap">{description}</p>
        </div>
    );
}
