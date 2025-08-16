import { Box, Checkbox, Flex, Text, Badge, Icon } from '@chakra-ui/react'
import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip } from '../ui/tooltip';
import Model from './Model';
import { useDispatch } from 'react-redux';
import { markComplete, removeTask, type ITask } from '../../../feature/store/reducer/task';
import { priorityLevels, type PriorityOption } from './Select';
import { RiEmotionHappyLine } from 'react-icons/ri';


interface TaskItemProps {
    task : ITask
}

const TaskItem: React.FC<TaskItemProps> = (task) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const dispactch = useDispatch();
    const [priorityDetails, setPriorityDetails] = React.useState<PriorityOption>({
          label: "Chill Mode",
          value: "chill",
          icon: <RiEmotionHappyLine />,
          description: "Sit back & relax",
          color: "#a7f3d0", // soft mint
          bg: "rgba(167,243,208,0.15)",
        },);

    const markCompleted = () => {
        dispactch(markComplete(task.task.uid));
    }

    const dueDate = new Date(task.task.deadline) < new Date();
    
    const Remove = () => {
        dispactch(removeTask(task.task.uid))
    }

    const getPriority = () => {
        const priority = priorityLevels.items.find(item => item.value.toLowerCase().trim() === task.task.priority.toLowerCase().trim())
        if (priority) return priority
    }
    React.useEffect(() => {
        const pri = getPriority();
        if (pri) {
            setPriorityDetails(pri);
        }
    },[task])

    return (
        <>
            <Box
                bg={dueDate ? "rgba(255, 144, 144, 0.25)": "rgba(255, 255, 255, 0.15)"}
                p={5}
                rounded="xl"
                boxShadow="0 8px 20px rgba(0, 0, 0, 0.2)"
                backdropFilter="blur(12px)"
                border="1px solid rgba(255,255,255,0.2)"
                _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
                    transition: '0.2s ease'
                }}
                id={task.task.uid}
            >
                <Flex justify="space-between" align="center" mb={2}>
                    <Tooltip content="Task Title">
                        <Text fontWeight="medium" fontSize="lg" color="white" textDecor={task.task.isCompleted ? 'line-through' : 'none'} cursor={'pointer'} onClick={() => setOpen(!open)}>
                            {task.task.title}
                        </Text>
                    </Tooltip>
                    <Box display={'flex'} alignItems={'center'} gap={2}>
                        <Checkbox.Root variant="subtle" colorPalette="purple" defaultChecked={task.task.isCompleted} onChange={markCompleted}>
                            <Checkbox.HiddenInput />
                            <Tooltip content="Mark done">
                                <Checkbox.Control cursor={'pointer'} rounded="md" bg="rgba(255,255,255,0.2)" border="none" />
                            </Tooltip>
                        </Checkbox.Root>
                        {task.task.isCompleted &&
                            <Icon cursor={'pointer'} bg="rgba(255,255,255,0.2)" rounded={5} padding={1} color={'red.300'} onClick={Remove} ><MdDeleteOutline style={{ fontSize: '20px' }} /></Icon>}
                    </Box>
                </Flex>
                <Text mb={3} fontWeight='light' fontSize="sm" color="gray.300" lineClamp={2}>
                    {task.task.description}
                </Text>

                <Flex justify="space-between" align="center">
                    <Tooltip content={priorityDetails.description}>
                        <Badge
                            px={3}
                            py={1}
                            borderRadius="full"
                            bg={priorityDetails.bg}
                            color="white"
                            fontWeight="semibold"
                            fontSize="0.8rem"
                        >
                            {priorityDetails.label}
                        </Badge>
                    </Tooltip>
                    <Tooltip content="Due Date">
                        <Text fontSize="sm" color="rgba(255,255,255,0.8)">
                            {new Date(task.task.deadline).toLocaleString()}
                        </Text>
                    </Tooltip>
                </Flex>
            </Box>
            <Model open={open} close={handleClose} taskUid={task.task.uid} isEdit={true} />
        </>
    )
}


export default TaskItem