import { Box, Checkbox, Flex, Text, Badge, Icon } from '@chakra-ui/react'
import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip } from '../ui/tooltip';
import Model from './Model';
import { useDispatch } from 'react-redux';
import { markComplete, removeTask } from '../../../feature/store/reducer/task';
import { priorityLevels, type PriorityOption } from './Select';
import { RiEmotionHappyLine } from 'react-icons/ri';


interface TaskItemProps {
    title: string
    priorityLabel: string
    dueDate: string
    completed: boolean
    uid: string;
    description: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, priorityLabel, dueDate, completed, uid, description }) => {
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
        dispactch(markComplete(uid));
    }
    
    const Remove = () => {
        dispactch(removeTask(uid))
    }

    const getPriority = () => {
        const priority = priorityLevels.items.find(item => item.value.toLowerCase().trim() === priorityLabel.toLowerCase().trim())
        if (priority) return priority
    }
    React.useEffect(() => {
        const pri = getPriority();
        console.log(priorityLabel, pri)
        if (pri) {
            setPriorityDetails(pri);
        }
    },[])

    return (
        <>
            <Box
                bg="rgba(255, 255, 255, 0.15)"
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
                id={uid}
            >
                <Flex justify="space-between" align="center" mb={2}>
                    <Tooltip content="Task Title">
                        <Text fontWeight="medium" fontSize="lg" color="white" textDecor={completed ? 'line-through' : 'none'} cursor={'pointer'} onClick={() => setOpen(!open)}>
                            {title}
                        </Text>
                    </Tooltip>
                    <Box display={'flex'} alignItems={'center'} gap={2}>
                        <Checkbox.Root variant="subtle" colorPalette="purple" defaultChecked={completed} onChange={markCompleted}>
                            <Checkbox.HiddenInput />
                            <Tooltip content="Mark done">
                                <Checkbox.Control cursor={'pointer'} rounded="md" bg="rgba(255,255,255,0.2)" border="none" />
                            </Tooltip>
                        </Checkbox.Root>
                        {completed &&
                            <Icon cursor={'pointer'} bg="rgba(255,255,255,0.2)" rounded={5} padding={1} color={'red.300'} onClick={Remove} ><MdDeleteOutline style={{ fontSize: '20px' }} /></Icon>}
                    </Box>
                </Flex>
                <Text mb={3} fontWeight='light' fontSize="sm" color="gray.300" lineClamp={2}>
                    {description}
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
                            {dueDate}
                        </Text>
                    </Tooltip>
                </Flex>
            </Box>
            <Model open={open} close={handleClose} taskUid='abc' />
        </>
    )
}


export default TaskItem