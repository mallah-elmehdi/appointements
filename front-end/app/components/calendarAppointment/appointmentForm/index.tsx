import { zodResolver } from '@hookform/resolvers/zod';
import { addHours, format } from 'date-fns';
import { Trash } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { createAppointment, deleteAppointment, getAppointment, updateAppointment } from '~/api/appointment';
import { Button } from '~/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Textarea } from '~/components/ui/textarea';
import { COLORS, useCalendarContext } from '..';
import { DatePicker } from './datePicker';
import type { AppointmentType } from '~/lib/types';

const formSchema = z
    .object({
        title: z.string().min(1, {
            message: "Please specify the appointment's title",
        }),
        description: z.string().optional(),
        color: z.string().length(7),
        startDate: z.date(),
        startTime: z.string(),
        endDate: z.date(),
        endTime: z.string(),
    })
    .required()
    .refine(
        (data) => {
            const start = new Date(`${data.startDate.toDateString()} ${data.startTime}`);
            const end = new Date(`${data.endDate.toDateString()} ${data.endTime}`);
            return end > start;
        },
        {
            message: 'End must be after start',
            path: ['endDate'],
        }
    );

export default function AppointmentForm() {
    const { openDialogForm, setOpenDialogForm, formData, setLoader, setData } = useCalendarContext();
    const now = new Date();
    const addHourToNow = addHours(now, 1);
    const { username } = useParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            color: COLORS[0],
            startDate: now,
            startTime: format(now, 'HH:mm'),
            endDate: addHourToNow,
            endTime: format(addHourToNow, 'HH:mm'),
        },
    });

    const handleGet = async () => {
        try {
            setLoader(true);
            const response = await getAppointment(username);
            setData(response.data.data.appointments);
        } finally {
            setLoader(false);
        }
    };

    const handleCreate = async (data: AppointmentType & { username: string | undefined }) => {
        try {
            setLoader(true);

            const response = await createAppointment(data);
            handleGet();
            toast.success(response.data.message);
            setOpenDialogForm(!openDialogForm);
            form.reset();
        } catch (error) {
            // @ts-ignore
            toast.error(error?.response?.data?.message || error?.message || 'Error happened');
            return;
        } finally {
            setLoader(false);
        }
    };

    const handleUpdate = async (data: AppointmentType & { username: string | undefined; id: string | undefined }) => {
        try {
            setLoader(true);
            const response = await updateAppointment(data);
            handleGet();
            toast.success(response.data.message);
            setOpenDialogForm(!openDialogForm);
            form.reset();
        } catch (error) {
            // @ts-ignore
            toast.error(error?.response?.data?.message || error?.message || 'Error happened');
            return;
        } finally {
            setLoader(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoader(true);
            const response = await deleteAppointment(formData?._id);
            await handleGet();
            toast.success(response.data.message);
            setOpenDialogForm(!openDialogForm);
            form.reset();
        } catch (error) {
            // @ts-ignore
            toast.error(error?.response?.data?.message || error?.message || 'Error happened');
            return;
        } finally {
            setLoader(false);
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { startTime, endTime, startDate, endDate } = values;

        const [startHours, startMinutes] = startTime.split(':').map((str) => parseInt(str, 10));
        const [endHours, endMinutes] = endTime.split(':').map((str) => parseInt(str, 10));
        const _startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startHours, startMinutes);
        const _endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endHours, endMinutes);

        if (formData) {
            handleUpdate({
                ...values,
                startDate: _startDate,
                endDate: _endDate,
                username,
                id: formData._id,
            });
        } else {
            handleCreate({
                ...values,
                startDate: _startDate,
                endDate: _endDate,
                username,
            });
        }
    }

    useEffect(() => {
        if (formData) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);

            form.setValue('title', formData.title);
            form.setValue('description', formData.description);
            form.setValue('color', formData.color);
            form.setValue('startDate', start);
            form.setValue('startTime', format(start, 'HH:mm'));
            form.setValue('endDate', end);
            form.setValue('endTime', format(end, 'HH:mm'));
        } else {
            form.reset();
        }
    }, [formData]);

    return (
        <Dialog open={openDialogForm} onOpenChange={setOpenDialogForm}>
            <Form {...form}>
                <DialogContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader className="mb-2">
                            {formData && (
                                <Button type="button" onClick={handleDelete} size="icon" variant="destructive">
                                    <Trash />
                                </Button>
                            )}
                            <DialogTitle>{formData ? 'Manage your appointment' : 'Add new appointment'}</DialogTitle>
                            <DialogDescription>Please describe your appointment details</DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormItem>
                                <FormLabel>Start date and time</FormLabel>
                                <div className="grid grid-flow-row grid-cols-17 gap-3 items-center">
                                    <div className="col-span-8">
                                        <FormField
                                            control={form.control}
                                            name="startDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <DatePicker {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-1 mx-auto ">
                                        <Label className="text-center">-</Label>
                                    </div>

                                    <div className="col-span-8">
                                        <FormField
                                            control={form.control}
                                            name="startTime"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            defaultValue="09:00"
                                                            type="time"
                                                            id="time-picker"
                                                            step="60"
                                                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </FormItem>

                            <FormItem>
                                <FormLabel>End date and time</FormLabel>
                                <div className="grid grid-flow-row grid-cols-17 gap-3 items-center">
                                    <div className="col-span-8">
                                        <FormField
                                            control={form.control}
                                            name="endDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <DatePicker {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-1 mx-auto ">
                                        <Label className="text-center">-</Label>
                                    </div>

                                    <div className="col-span-8">
                                        <FormField
                                            control={form.control}
                                            name="endTime"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            defaultValue="09:00"
                                                            type="time"
                                                            id="time-picker"
                                                            step="60"
                                                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </FormItem>

                            <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Color</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                {...field}
                                                defaultValue={field.value}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                className="flex flex-row"
                                            >
                                                {COLORS.map((color) => (
                                                    <RadioGroupItem
                                                        className="size-7 border-0"
                                                        style={{
                                                            backgroundColor: color,
                                                        }}
                                                        value={color}
                                                        id={color}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="mt-4 flex flex-row">
                            <DialogClose asChild className="flex-1">
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button className="flex-1" type="submit">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Form>
        </Dialog>
    );
}
