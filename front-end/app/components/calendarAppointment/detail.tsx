import React from 'react';
import { DialogContent, DialogHeader, Dialog, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';
import { useCalendarContext } from '.';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function Detail() {
    const { openDialogForm, setOpenDialogForm, formData } = useCalendarContext();
    const { title, description, startDate, endDate } = formData || {};

    return (
        <Dialog open={openDialogForm} onOpenChange={setOpenDialogForm}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="flex gap-2 items-center text-sm">
                    <Clock />
                    {format(startDate || new Date(), 'PPp')} - {format(endDate || new Date(), 'PPp')}
                </div>
            </DialogContent>
        </Dialog>
    );
}
