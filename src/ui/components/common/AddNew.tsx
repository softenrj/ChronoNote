import { Box, VStack, Textarea, Flex } from '@chakra-ui/react';
import React, { type SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import { SelectRoot } from './Select';
import { HiCalendarDateRange } from 'react-icons/hi2';
import { type ITask } from '../../../feature/store/reducer/task';
import { useColorModeValue } from '../ui/color-mode';

function AddNew({
  setTaskForm,
  taskForm,
}: {
  setTaskForm: React.Dispatch<SetStateAction<ITask>>;
  taskForm: ITask;
}) {

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) setTaskForm(prev => ({ ...prev, deadline: new Date(newDate).toISOString() }));
  };

  const textColor = useColorModeValue("gray.800", "white");
  const boxBg = useColorModeValue("blue.100", "rgba(85, 104, 198, 0.86)");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box pos="relative">
      <VStack align="flex-start" justify="center" gap={4}>
        <Textarea
          value={taskForm.title}
          onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
          color={textColor}
          _placeholder={{ color: placeholderColor }}
          variant="flushed"
          size="lg"
          fontSize="lg"
          placeholder="Enter your Task here"
          flex="1"
          autoresize
        />
        <Flex gap={4} flexWrap="wrap">
          <SelectRoot selected={taskForm.priority} setTaskForm={setTaskForm} />
          <Box
            bg={boxBg}
            display="flex"
            alignItems="center"
            gap={2}
            color={textColor}
            pl={6}
            rounded="sm"
          >
            <HiCalendarDateRange />
            <DatePicker
              selected={new Date(taskForm.deadline)}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="Pp"
            />
          </Box>
        </Flex>
        <Textarea
          value={taskForm.description}
          onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
          color={textColor}
          _placeholder={{ color: placeholderColor }}
          variant="outline"
          autoresize
          size="lg"
          fontSize="lg"
          placeholder="Description"
          flex="1"
        />
      </VStack>
    </Box>
  );
}

export default AddNew;
