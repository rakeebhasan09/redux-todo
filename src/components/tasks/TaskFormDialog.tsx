import { useForm, Controller } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    PRIORITY_LABEL,
    STATUS_LABEL,
    TASK_PRIORITY,
    TASK_STATUS,
    type ITaskInput,
} from "@/redux/features/tasks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addTask, updateTask } from "@/redux/features/tasks/tasks.slice";
import { useEffect } from "react";
import { selectTaskById } from "@/redux/features/tasks/tasks.selector";
import type { RootState } from "@/redux/store";
import { taskFormDefaultValues } from "@/redux/features/tasks/tasks.schema";
import { toast } from "sonner";

type TDialogMode = "create" | "edit";

interface IProps {
    open: boolean;
    mode: TDialogMode;
    onClose: () => void;
    editingId: string | null;
}

export function TaskFormDialog({ open, mode, onClose, editingId }: IProps) {
    const { register, handleSubmit, control, reset } = useForm<ITaskInput>();
    const dispatch = useAppDispatch();
    const editing = useAppSelector((state: RootState) =>
        editingId ? selectTaskById(state, editingId) : undefined,
    );

    useEffect(() => {
        if (!open) return;
        if (mode === "edit" && editing) {
            reset({
                title: editing.title,
                description: editing.description,
                status: editing.status,
                priority: editing.priority,
            });
        } else {
            reset(taskFormDefaultValues);
        }
    }, [reset, open, mode, editing]);

    const onSubmit = (values: ITaskInput) => {
        if (mode === "edit" && editing) {
            dispatch(updateTask({ id: editing.id, change: values }));
            toast.success("Task updated");
        } else {
            dispatch(addTask(values));
            toast.success("Task created");
        }
        onClose();
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit task" : "New task"}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === "edit"
                            ? "Update the details of this task."
                            : "Capture what you need to get done."}
                    </DialogDescription>
                </DialogHeader>

                <form
                    id="task-form"
                    className="space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <div className="space-y-1.5">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            autoFocus
                            {...register("title")}
                            placeholder="What needs doing?"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            rows={3}
                            {...register("description")}
                            placeholder="Optional details…"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label>Status</Label>
                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TASK_STATUS.map((status) => (
                                                <SelectItem
                                                    className="capitalize"
                                                    value={status}
                                                    key={status}
                                                >
                                                    {STATUS_LABEL[status]}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label>Priority</Label>
                            <Controller
                                control={control}
                                name="priority"
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TASK_PRIORITY.map((priority) => (
                                                <SelectItem
                                                    className="capitalize"
                                                    value={priority}
                                                    key={priority}
                                                >
                                                    {PRIORITY_LABEL[priority]}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                </form>

                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button form="task-form" type="submit">
                        {mode === "edit" ? "Save changes" : "Create task"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
