import { Box, Checkbox, Flex, Heading, Text, VStack, Badge, Icon } from '@chakra-ui/react'
import React from 'react'
import { MdDeleteOutline } from "react-icons/md";

function TaskList() {
    return (
        <Box px={8} py={6} bg="#0f1a29" minH="100vh">
            <Heading color="white" fontSize="2xl" mb={6}>
                Task List
            </Heading>
            <VStack gap={4} align="stretch">
                <TaskItem
                    title="Ker LE Bsdk"
                    tag="Chill"
                    tagColor="rgba(255,182,193,0.6)"
                    dueDate="02/12/2025 14:24"
                    completed={false}
                />
                <TaskItem
                    title="Complete UI Improvements"
                    tag="Urgent"
                    tagColor="rgba(255,105,180,0.6)"
                    dueDate="15/12/2025 10:00"
                    completed={true}
                />
            </VStack>
        </Box>
    )
}

export default TaskList

interface TaskItemProps {
    title: string
    tag: string
    tagColor: string
    dueDate: string
    completed: boolean
}

const TaskItem: React.FC<TaskItemProps> = ({ title, tag, tagColor, dueDate, completed }) => {
    return (
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
        >
            <Flex justify="space-between" align="center" mb={3}>
                <Text fontWeight="medium" fontSize="lg" color="white" textDecor={completed ? 'line-through' : 'none'} >
                    {title}
                </Text>
                <Checkbox.Root variant="subtle" colorPalette="purple" defaultChecked={completed}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control rounded="md" bg="rgba(255,255,255,0.2)" border="none" />
                </Checkbox.Root>
                {completed && 
                <Icon bg={'gray.400'}><MdDeleteOutline /></Icon>}
            </Flex>

            <Flex justify="space-between" align="center">
                <Badge
                    px={3}
                    py={1}
                    borderRadius="full"
                    bg={tagColor}
                    color="white"
                    fontWeight="semibold"
                    fontSize="0.8rem"
                >
                    {tag}
                </Badge>
                <Text fontSize="sm" color="rgba(255,255,255,0.8)">
                    {dueDate}
                </Text>
            </Flex>
        </Box>
    )
}
