'use client';

import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';

export function DatePicker(field: ControllerRenderProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" id="date-picker" className="w-full justify-between font-normal">
                    {field.value ? field.value.toLocaleDateString() : 'Select date'}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full overflow-hidden p-0" align="start">
                <Calendar
                    mode="single"
                    selected={field.value}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                        field.onChange(date);
                        setOpen(false);
                    }}
                    reverseYears
                    startMonth={new Date(2000, 0)}
                    endMonth={new Date(2100, 11)}
                />
            </PopoverContent>
        </Popover>
    );
}
