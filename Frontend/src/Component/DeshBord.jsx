// src/components/Dashboard.js
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable react/jsx-key */
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Skeleton,
  Box,
  Container,
  Button,
  Stack,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
  InputRightElement,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  VStack,
  Toast,
} from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';
import { MdAutoGraph, MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { Input } from '@chakra-ui/react';
import Error from '../Error';
import exportFromJSON from 'export-from-json';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import EditEmployeeForm from './EditEmployeeForm';
import useEmployeeData from '../hooks/userEmployeeData';
import axios from 'axios';
import { get } from '../services/ApiEndpoint';

function Dashboard() {
  const navigate = useNavigate();
  const {
    posts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedAge,
    selectedSalary,
    updateIconState,
    setUpdateIconState,
    departments,
    fetchData,
    handleSalary,
    handleAge,
    filterByDepartments,
  } = useEmployeeData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const  router = useNavigate();
  const handleSearch = (e) => {
    
   setSearchTerm(e.target.value);
  
  };

  const handleCheckboxChange = (index) => {
    let newSelectedDepartments = [...selectedDepartments];
    const dept = departments[index];
    if (newSelectedDepartments.includes(dept)) {
      newSelectedDepartments = newSelectedDepartments.filter((d) => d !== dept);
    } else {
      newSelectedDepartments.push(dept);
    }
    setSelectedDepartments(newSelectedDepartments);

    if (newSelectedDepartments.length === 0) {
      fetchData();
      return;
    }
    filterByDepartments(newSelectedDepartments);
  };

  const onClickUpdateIcon = (index) => {
    const newUpdateIconState = [...updateIconState];
    newUpdateIconState[index] = !newUpdateIconState[index];
    setUpdateIconState(newUpdateIconState);
  };

  const downloadCsv = () => {
    const data = posts.map((post) => ({
      ...post,
      hire_date: new Date(post.hire_date).toLocaleDateString(),
    }));
    const fileName = 'employee_data';
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    const headers = [
      ['Employee Id', 'First Name', 'Last Name', 'Age', 'Email', 'Department', 'Salary', 'Hire Date', 'Job Title'],
    ];
    const data = posts.map((post, index) => [
      index + 1,
      post.first_name,
      post.last_name,
      post.age,
      post.email,
      post.department,
      post.salary,
      new Date(post.hire_date).toLocaleDateString(),
      post.job_title,
    ]);
    doc.text('Employee Data', 10, 10);
    doc.autoTable({
      startY: 20,
      head: headers,
      body: data,
    });
    doc.save('employee_data.pdf');
  };

  const downloadXls = () => {
    const data = posts.map((post) => ({
      ...post,
      hire_date: new Date(post.hire_date).toLocaleDateString(),
    }));
    const fileName = 'employee_data';
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDelete = async (employeeid) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/user/${employeeid}`);
      console.log(response);
      fetchData();
    } catch (error) {
      console.error(error);
      alert('Error in Delete Process');
    }
  };

  const handleAdd = () => {
    setSelectedEmployee(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = () => {
    fetchData();
  };
   
  return (
    <>
      <Container maxW="container.xl" mt={{ base: '20px', md: '30px' }} mb={{ base: '20px', md: '30px' }}>
        <Box>
          <Stack spacing={{ base: 4, md: 6 }}>
            <InputGroup size={{ base: 'sm', md: 'md' }}>
              <InputLeftElement pointerEvents="none">
                <CiSearch />
              </InputLeftElement>
              <Input
                value={searchTerm}
                onChange={(e)=>handleSearch(e)}
                placeholder="Search by ID or Employee Name"
                fontSize={{ base: 'sm', md: 'md' }}
              />
              <InputRightElement>
                <Button size={{ base: 'sm', md: 'md' }} onClick={()=>{ 
                  if(searchTerm === ""){
                    alert('Serach fields is empty')
                  }
                }}>
                  <CiSearch />
                </Button>
              </InputRightElement>
            </InputGroup>

            <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 4, md: 6 }}>
              <Stack>
                <Select
                  value={selectedSalary}
                  placeholder="Select Salary"
                  onChange={(e) => handleSalary(e.target.value)}
                  size={{ base: 'sm', md: 'md' }}
                >
                  <option value="50000">{'<'} 50,000</option>
                  <option value="100000">{'>'} 100,000</option>
                  <option value="500000">{'>'} 500,000</option>
                </Select>
              </Stack>
              <Stack>
                <Select
                  value={selectedAge}
                  placeholder="Select Age"
                  onChange={(e) => handleAge(e.target.value)}
                  size={{ base: 'sm', md: 'md' }}
                >
                  <option value="20">{'>'} 20</option>
                  <option value="50">{'>'} 50</option>
                  <option value="60">{'>'} 60</option>
                </Select>
              </Stack>
            </Flex>

            <Flex
              wrap="wrap"
              gap={{ base: 2, md: 4 }}
              mt={{ base: 2, md: 4 }}
              justify={{ base: 'flex-start', md: 'flex-start' }}
            >
              {departments.map((value, index) => (
                <Checkbox
                  size={{ base: 'sm', md: 'md' }}
                  isChecked={selectedDepartments.includes(value)}
                  key={value}
                  onChange={() => handleCheckboxChange(index)}
                  colorScheme="blue"
                >
                  <Text fontSize={{ base: 'sm', md: 'md' }}>{value}</Text>
                </Checkbox>
              ))}
            </Flex>
            <Button mt={4} colorScheme="blue" size={{ base: 'sm', md: 'md' }} onClick={handleAdd}>
              Add Employee
            </Button>
          </Stack>
        </Box>
      </Container>

      <Flex
        justifyContent="flex-start"
        position="fixed"
        bottom={{ base: '10px', md: '20px' }}
        left={{ base: '10px', md: '20px' }}
        zIndex="10"
      >
        <Menu>
          <MenuButton as={Button} colorScheme="blue" size={{ base: 'sm', md: 'md' }} color="white">
            Download
          </MenuButton>
          <MenuList fontSize={{ base: 'sm', md: 'md' }}>
            <MenuItem onClick={generatePdf}>Download as PDF</MenuItem>
            <MenuItem onClick={downloadCsv}>Download as CSV</MenuItem>
            <MenuItem onClick={downloadXls}>Download as XLS</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Flex
        justifyContent="flex-end"
        position="fixed"
        top={{ base: '10px', md: '20px' }}
        right={{ base: '10px', md: '20px' }}
        zIndex="10"
      >
        <Menu>
          <MenuButton as={Button} colorScheme="gray" size={{ base: 'sm', md: 'md' }} color="black">
            <MdAutoGraph />
          </MenuButton>
          <MenuList fontSize={{ base: 'sm', md: 'md' }}>
            <MenuItem onClick={() => handleNavigate('/Charts1')}>Salary vs Person</MenuItem>
            <MenuItem onClick={() => handleNavigate('/Charts2')}>Salary vs Department</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Box m={1} overflowX={{ base: 'auto', md: 'auto' }}>
        {/* Table for Desktop */}
        <TableContainer display={{ base: 'none', md: 'block' }}>
          <Table variant="simple">
            <TableCaption>Employee Data</TableCaption>
            <Thead>
              <Tr>
                <Th>Employee Id</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Age</Th>
                <Th>Email</Th>
                <Th>Department</Th>
                <Th>Salary</Th>
                <Th>Hire Date</Th>
                <Th>Job Title</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {error && <Error />}
              {loading ? (
                <>
                  {[...Array(10)].map((_, i) => (
                    <Tr key={i}>
                      {Array(11).fill(0).map((_, idx) => (
                        <Td key={idx}>
                          <Skeleton height="20px" />
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </>
              ) : posts.length === 0 ? (
                <Tr>
                  <Td colSpan={11} textAlign="center">
                    No data found.
                  </Td>
                </Tr>
              ) : (
                posts.map((post, index) => (
                  <Tr key={post.id || index}>
                    <Td>{index + 1}</Td>
                    <Td>{post.first_name}</Td>
                    <Td>{post.last_name}</Td>
                    <Td>{post.age}</Td>
                    <Td>{post.email}</Td>
                    <Td>{post.department}</Td>
                    <Td>{post.salary}</Td>
                    <Td>{new Date(post.hire_date).toLocaleDateString('en-US')}</Td>
                    <Td>{post.job_title}</Td>
                    <Td>
                      <Button size="sm" onClick={() => handleEdit(post)}>
                        <FaRegEdit />
                      </Button>
                    </Td>
                    <Td>
                      <Button size="sm" onClick={() => handleDelete(post._id)}>
                        <MdDelete />
                      </Button>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Card Layout for Mobile */}
        <VStack display={{ base: 'flex', md: 'none' }} spacing={4} align="stretch" m={4}>
          {error && <Error />}
          {loading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <Box key={i} p={4} borderWidth="1px" borderRadius="md" boxShadow="sm">
                  <Skeleton height="20px" mb={2} />
                  <Skeleton height="20px" mb={2} />
                  <Skeleton height="20px" mb={2} />
                  <Skeleton height="20px" />
                </Box>
              ))}
            </>
          ) : posts.length === 0 ? (
            <Text textAlign="center" fontSize="sm">
              No data found.
            </Text>
          ) : (
            posts.map((post, index) => (
              <Box
                key={post.id || index}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="sm"
                bg="white"
              >
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm">
                    <strong>ID:</strong> {index + 1}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Name:</strong> {post.first_name} {post.last_name}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Age:</strong> {post.age}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Email:</strong> {post.email}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Department:</strong> {post.department}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Salary:</strong> {post.salary}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Hire Date:</strong> {new Date(post.hire_date).toLocaleDateString('en-US')}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Job Title:</strong> {post.job_title}
                  </Text>
                  <Flex gap={2}>
                    <Button size="sm" onClick={() => handleEdit(post)}>
                      <FaRegEdit />
                    </Button>
                    <Button size="sm" onClick={() => handleDelete(post._id)}>
                      <MdDelete />
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            ))
          )}
        </VStack>
      </Box>

      <EditEmployeeForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        employee={selectedEmployee}
        onSubmit={handleFormSubmit}
        departments={departments}
      />
    </>
  );
}

export default Dashboard;