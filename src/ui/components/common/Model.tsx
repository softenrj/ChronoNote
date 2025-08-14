import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import React from 'react'
import AddNew from './AddNew';
import { CgAdd } from 'react-icons/cg';
import { Tooltip } from '../ui/tooltip';
import { addTask, TaskPriority, type ITask } from '../../../feature/store/reducer/task';
import { useAppDispatch } from '../../../hooks/redux';
import toast from 'react-hot-toast';

interface Props {
    open: boolean;
    close: () => void;
    isEdit?: boolean;
    taskUid: string;
}

function Model({
    open,
    close,
    isEdit = false,
    taskUid
}: Props) {
    const [taskForm, setTaskForm] = React.useState<ITask>({
        uid: '',
        title: '',
        description: '',
        priority: TaskPriority.Low,
        deadline: new Date().toISOString(),
        isCompleted: false
    });
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        toast.success("Task created");
        dispatch(addTask(taskForm))
        setTaskForm({
            uid: '',
            title: '',
            description: '',
            priority: TaskPriority.Low,
            deadline: new Date().toDateString(),
            isCompleted: false
        })
        close();
    }

    return (
        <Dialog.Root open={open} onOpenChange={close} placement={'center'}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{isEdit ? 'Edit Task' : 'Create Task'}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <AddNew taskForm={taskForm} setTaskForm={setTaskForm} />
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Tooltip content={"Click To add new Task"} openDelay={60}>
                                <Button
                                    colorPalette="teal"
                                    variant="surface"
                                    size={'sm'}
                                    onClick={handleSubmit}
                                >
                                    <CgAdd />
                                    Add
                                </Button>
                            </Tooltip>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default Model