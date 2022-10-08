import { Box, Button, Input, InputGroup, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const [input, setInput] = useState('');

  const [todo, setTodo] = useState([]);

  function handleClick(id) {
    todo.map((item) => {
      if (item.id == id) {
        item.active = !item.active;
        setTodo([...todo]);
      }
    });
  }

  return (
    <Box
      display={'flex'} 
      flexDirection={'column'} 
      alignItems={'center'}
      justifyContent={'center'}>
        <Head>
          <title>Todo App</title>
        </Head>
        <Text fontSize={'30px'} fontWeight={'700'}>ToDo List</Text>
        <Button colorScheme={'orange'} onClick={onOpen}>Add New ToDo</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New ToDo</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <InputGroup>
                <Input placeholder="Add New ToDo" value={input} onChange={() => setInput(event.target.value)}/>
              </InputGroup>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme={'green'} mr={3} onClick={() => {
                setTodo([...todo, { id: todo.length + 1, title: input, active: true }])
                setInput('')
                onClose()
              }}>Add</Button>
              <Button colorScheme={'blue'} mr={3} onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        Total Todo: {todo.length}
        <Box>
          {todo.slice(0).reverse().map(list => <Box 
            width={'500px'} 
            fontSize={'18px'} 
            fontWeight={500} 
            padding={'10px'}
            backgroundColor={'gray.700'}
            margin={'10px'}
            borderRadius={'lg'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}>{list.title}<Button colorScheme={list.active ? "blue": "green"} onClick={() => handleClick(list.id)}>{list.active ? "Active": "Completed"}</Button></Box>)}
        </Box>
    </Box>
  )
}
