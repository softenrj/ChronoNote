import { Box, Button, Flex, Heading, Icon, VStack } from '@chakra-ui/react'
import React from 'react'
import TaskItem from './TaskCard'
import { CgAdd } from 'react-icons/cg'
import Model from './Model'
import { useAppSelector } from '../../../hooks/redux'

function TaskList() {
    const [open, setOpen] = React.useState(false);
    const tasks = useAppSelector(state => state.taskSlice);
    return (
        <>
            <Box px={8} py={6} bg="#0f1a29" minH="100vh">
                <Flex justifyContent={'space-between'} alignItems={'center'} mb={4}>
                    <Heading color="white" fontSize="2xl" mb={6}>
                        Task List
                    </Heading>
                    <Button
                        colorPalette="teal"
                        variant="surface"
                        size={'sm'}
                        onClick={() => setOpen(true)}
                    >
                        <CgAdd />
                        Add
                    </Button>
                </Flex>
                <VStack gap={4} align="stretch">
                    {tasks && Array.isArray(tasks) && tasks.length > 0 && tasks.map(
                        item => (
                            <TaskItem
                                uid={item.uid}
                                title={item.title}
                                priorityLabel={item.priority}
                                description={item.description}
                                dueDate={new Date(item.deadline).toDateString()}
                                completed={item.isCompleted}
                            />
                        )
                    )}
                </VStack>
            </Box>
            <Model open={open} close={() => setOpen(false)} taskUid='null' />
        </>
    )
}

export default TaskList

