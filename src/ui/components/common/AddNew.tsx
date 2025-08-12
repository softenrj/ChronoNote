import { Box, Button, Center, VStack, Textarea, Flex } from '@chakra-ui/react';
import React from 'react';
import { Tooltip } from '../ui/tooltip';
import { CgAdd } from "react-icons/cg";
import DatePicker from 'react-datepicker';
import { SelectRoot } from './Select';
import { HiCalendarDateRange } from 'react-icons/hi2';

function AddNew() {
    const [date, setDate] = React.useState(new Date());
    const handleDateChange = (e: Date | null) => { 
        if (e) setDate(e)
    }
    return (
        <Box w="full" my={8}>
            <Center>
                <VStack
                    align="flex-start"
                    justify="center"
                    w={{ base: '80%', md: '70%', lg: '60%' }}
                    gap={4}
                >
                    <Textarea
                        autoresize
                        colorPalette="cyan"
                        color="white"
                        variant="flushed"
                        size="lg"
                        fontSize="lg"
                        placeholder="Enter your Task here"
                        flex="1"
                    />
                    <Flex gap={4} flexWrap={'wrap'}>
                        <SelectRoot />
                        <Box bg={'rgba(85, 104, 198, 0.86)'} display={'flex'} alignItems={'center'} gap={2} color={'white'} pl={6} rounded={'sm'}>
                            <HiCalendarDateRange />
                            <><DatePicker selected={date} onChange={(e) => handleDateChange(e)} showTimeSelect dateFormat="Pp" /></>
                        </Box>
                        <Tooltip content={"Click To add new Task"} openDelay={60}>
                        <Button
                            colorPalette="teal"
                            variant="surface"
                            size={'sm'}
                        >
                            <CgAdd />
                            Add
                        </Button>
                    </Tooltip>
                    </Flex>
                </VStack>

            </Center>
        </Box>
    );
}

export default AddNew;
