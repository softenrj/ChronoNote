import { Box, Center, Text } from '@chakra-ui/react'
import React from 'react'
import Hero from './components/hero/hero'
import AddNew from './components/common/AddNew'
import TaskList from './components/common/TaskList'

function App() {
  return (
    <Box>
      <Hero />
      <TaskList />
    </Box>
  )
}

export default App