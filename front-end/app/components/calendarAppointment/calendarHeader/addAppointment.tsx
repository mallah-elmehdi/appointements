import { Plus } from 'lucide-react';
import { Button } from '../../ui/button';
import { useCalendarContext } from '..';
export default function AddAppointment() {
    const { openDialogForm, setOpenDialogForm, setFormData } = useCalendarContext();
    const handleClick = () => {
        setFormData(undefined);
        setOpenDialogForm(!openDialogForm);
    };

    return (
        <Button color="primary" className="cursor-pointer" onClick={handleClick}>
            <Plus />
            Appointment
        </Button>
    );
}
