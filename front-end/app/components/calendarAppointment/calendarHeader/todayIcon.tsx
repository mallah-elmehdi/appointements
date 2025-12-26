import { format } from 'date-fns';

export default function TodayIcon() {
    const today = new Date();

    return (
        <div className="flex size-12 flex-col items-center overflow-hidden rounded-md border">
            <span className="flex h-6 w-full items-center justify-center bg-primary text-center text-xs font-semibold text-primary-foreground uppercase">
                {format(today, 'MMM')}
            </span>
            <span className="flex w-full items-center justify-center text-lg font-bold">{format(today, 'dd')}</span>
        </div>
    );
}
