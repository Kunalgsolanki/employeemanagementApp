import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

// Mock data for employees and tasks
const initialEmployees = [
  { id: 1, name: 'John Doe', role: 'Developer', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'Designer', status: 'Active' },
];

const initialTasks = [
  { id: 1, title: 'Complete UI Design', assignee: 'Jane Smith', status: 'In Progress', dueDate: '2025-06-01' },
  { id: 2, title: 'API Integration', assignee: 'John Doe', status: 'Pending', dueDate: '2025-06-05' },
];

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [tasks, setTasks] = useState(initialTasks);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '' });
  const [newTask, setNewTask] = useState({ title: '', assignee: '', dueDate: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [modalType, setModalType] = useState('employee'); // 'employee' or 'task'

  // Add new employee with pending status
  const addEmployee = () => {
    if (newEmployee.name && newEmployee.role) {
      setEmployees([
        ...employees,
        {
          id: employees.length + 1,
          name: newEmployee.name,
          role: newEmployee.role,
          status: 'Pending Approval', // New employees start as pending
        },
      ]);
      setNewEmployee({ name: '', role: '' });
      toast({
        title: 'Employee Added',
        description: `${newEmployee.name} has been added and is pending manager approval.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Manager approves employee
  const approveEmployee = (employeeId) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === employeeId
          ? { ...employee, status: 'Active' }
          : employee
      )
    );
    toast({
      title: 'Employee Approved',
      description: `Employee has been approved and is now active.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Manager rejects employee
  const rejectEmployee = (employeeId) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === employeeId
          ? { ...employee, status: 'Rejected' }
          : employee
      )
    );
    toast({
      title: 'Employee Rejected',
      description: `Employee has been rejected.`,
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });
  };

  // Add new task
  const addTask = () => {
    if (newTask.title && newTask.assignee && newTask.dueDate) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          title: newTask.title,
          assignee: newTask.assignee,
          status: 'Pending',
          dueDate: newTask.dueDate,
        },
      ]);
      setNewTask({ title: '', assignee: '', dueDate: '' });
      toast({
        title: 'Task Added',
        description: `Task "${newTask.title}" has been added.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: 'Error',
        description: 'Please fill in all task fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Complete task
  const completeTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: 'Completed' } : task
      )
    );
    toast({
      title: 'Task Completed',
      description: `Task has been marked as completed.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <ChakraProvider>
      <Box p={8} maxWidth="1200px" mx="auto">
        <VStack spacing={8}>
          <Heading>Employee Dashboard</Heading>

          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList>
              <Tab>Employee Management</Tab>
              <Tab>Task Management</Tab>
              <Tab>Task History</Tab>
            </TabList>

            <TabPanels>
              {/* Employee Management Tab */}
              <TabPanel>
                <Box>
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    onClick={() => {
                      setModalType('employee');
                      onOpen();
                    }}
                    mb={4}
                  >
                    Add Employee
                  </Button>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Role</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {employees.map((employee) => (
                        <Tr key={employee.id}>
                          <Td>{employee.name}</Td>
                          <Td>{employee.role}</Td>
                          <Td>
                            <Badge
                              colorScheme={
                                employee.status === 'Active'
                                  ? 'green'
                                  : employee.status === 'Pending Approval'
                                  ? 'yellow'
                                  : 'red'
                              }
                            >
                              {employee.status}
                            </Badge>
                          </Td>
                          <Td>
                            {employee.status === 'Pending Approval' && (
                              <>
                                <Button
                                  size="sm"
                                  colorScheme="green"
                                  leftIcon={<CheckIcon />}
                                  onClick={() => approveEmployee(employee.id)}
                                  mr={2}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  colorScheme="red"
                                  leftIcon={<CloseIcon />}
                                  onClick={() => rejectEmployee(employee.id)}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>

              {/* Task Management Tab */}
              <TabPanel>
                <Box>
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    onClick={() => {
                      setModalType('task');
                      onOpen();
                    }}
                    mb={4}
                  >
                    Add Task
                  </Button>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Title</Th>
                        <Th>Assignee</Th>
                        <Th>Status</Th>
                        <Th>Due Date</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tasks.map((task) => (
                        <Tr key={task.id}>
                          <Td>{task.title}</Td>
                          <Td>{task.assignee}</Td>
                          <Td>
                            <Badge
                              colorScheme={
                                task.status === 'Completed' ? 'green' : 'yellow'
                              }
                            >
                              {task.status}
                            </Badge>
                          </Td>
                          <Td>{task.dueDate}</Td>
                          <Td>
                            {task.status !== 'Completed' && (
                              <Button
                                size="sm"
                                colorScheme="green"
                                leftIcon={<CheckIcon />}
                                onClick={() => completeTask(task.id)}
                              >
                                Complete
                              </Button>
                            )}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>

              {/* Task History Tab */}
              <TabPanel>
                <Box>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Title</Th>
                        <Th>Assignee</Th>
                        <Th>Status</Th>
                        <Th>Due Date</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tasks
                        .filter((task) => task.status === 'Completed')
                        .map((task) => (
                          <Tr key={task.id}>
                            <Td>{task.title}</Td>
                            <Td>{task.assignee}</Td>
                            <Td>
                              <Badge colorScheme="green">{task.status}</Badge>
                            </Td>
                            <Td>{task.dueDate}</Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>

        {/* Modal for Adding Employee/Task */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {modalType === 'employee' ? 'Add New Employee' : 'Add New Task'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {modalType === 'employee' ? (
                <>
                  <FormControl mb={4}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      value={newEmployee.name}
                      onChange={(e) =>
                        setNewEmployee({ ...newEmployee, name: e.target.value })
                      }
                      placeholder="Enter employee name"
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Role</FormLabel>
                    <Input
                      value={newEmployee.role}
                      onChange={(e) =>
                        setNewEmployee({ ...newEmployee, role: e.target.value })
                      }
                      placeholder="Enter role"
                    />
                  </FormControl>
                </>
              ) : (
                <>
                  <FormControl mb={4}>
                    <FormLabel>Task Title</FormLabel>
                    <Input
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                      placeholder="Enter task title"
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Assignee</FormLabel>
                    <Select
                      value={newTask.assignee}
                      onChange={(e) =>
                        setNewTask({ ...newTask, assignee: e.target.value })
                      }
                      placeholder="Select assignee"
                    >
                      {employees
                        .filter((employee) => employee.status === 'Active')
                        .map((employee) => (
                          <option key={employee.id} value={employee.name}>
                            {employee.name}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Due Date</FormLabel>
                    <Input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, dueDate: e.target.value })
                      }
                    />
                  </FormControl>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={modalType === 'employee' ? addEmployee : addTask}
              >
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default EmployeeDashboard;