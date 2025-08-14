"use client"

import {
  HStack,
  VStack,
  IconButton,
  Portal,
  Select,
  Text,
  createListCollection,
  useSelectContext,
  Icon,
} from "@chakra-ui/react"
import type { SetStateAction } from "react"
import {
  RiForbidLine,
  RiAlertFill,
  RiErrorWarningLine,
  RiInformationLine,
  RiEmotionHappyLine,
} from "react-icons/ri"
import { TaskPriority, type ITask } from "../../../feature/store/reducer/task"

const SelectTrigger = () => {
  const select = useSelectContext()
  const items = select.selectedItems as PriorityOption[]
  return (
    <IconButton
      px="2"
      variant="outline"
      size="sm"
      {...select.getTriggerProps()}
      bg={select.hasSelectedItems ? items[0].bg : '#bd89ebdb'}
      color={select.hasSelectedItems ? items[0].color : '#ffffffdb'}
    >
      {select.hasSelectedItems ? items[0].icon : <RiForbidLine />} Priority
    </IconButton>
  )
}

export const SelectRoot = ({ setTaskForm }: { setTaskForm: React.Dispatch<SetStateAction<ITask>> }) => {
  return (
    <Select.Root
      positioning={{ strategy: "fixed", hideWhenDetached: true }}
      collection={priorityLevels}
      size="sm"
      defaultValue={["important"]}
      maxW={20}
      onSelect={(e) => {
        const selectedPriority = priorityLevels.items.find(item => item.value === e.value);
        if (selectedPriority) {
          setTaskForm(prev => ({ ...prev, priority: selectedPriority.value }));
        }
      }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <SelectTrigger />
      </Select.Control>
        <Select.Positioner>
          <Select.Content minW="48" bg="#1f2937" color="white" borderRadius="md">
            {priorityLevels.items.map((priority) => (
              <Select.Item
                key={priority.value}
                item={priority}
                _hover={{ bg: priority.bg, color: priority.color }}
                borderRadius="md"
                p={2}
              >
                <HStack align="flex-start">
                  <Icon mt={1}>{priority.icon}</Icon>
                  <VStack gap={0} align="start">
                    <Text fontWeight="bold" color={priority.color}>
                      {priority.label}
                    </Text>
                    <Text fontSize="xs" color="gray.300">
                      {priority.description}
                    </Text>
                  </VStack>
                </HStack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
    </Select.Root >
  )
}

export const priorityLevels = createListCollection({
  items: [
    {
      label: "Important",
      value: TaskPriority.Important,
      icon: <RiErrorWarningLine />,
      description: "Needs your attention soon",
      color: "#fca5a5", // soft red
      bg: "rgba(252,165,165,0.15)",
    },
    {
      label: "Moderate",
      value: TaskPriority.Moderate,
      icon: <RiAlertFill />,
      description: "Handle when you can",
      color: "#fbbf24", // soft amber
      bg: "rgba(251,191,36,0.15)",
    },
    {
      label: "Low Priority",
      value: TaskPriority.Low,
      icon: <RiInformationLine />,
      description: "No rush, take your time",
      color: "#93c5fd", // soft blue
      bg: "rgba(147,197,253,0.15)",
    },
    {
      label: "Chill Mode",
      value: TaskPriority.Chill,
      icon: <RiEmotionHappyLine />,
      description: "Sit back & relax",
      color: "#a7f3d0", // soft mint
      bg: "rgba(167,243,208,0.15)",
    },
  ],
})

export interface PriorityOption {
  label: string
  value: string
  icon: React.ReactNode
  description: string
  color: string
  bg: string
}
