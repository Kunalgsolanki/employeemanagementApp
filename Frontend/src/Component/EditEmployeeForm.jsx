
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';

const EditEmployeeForm = ({ isOpen, onClose, employee, onSubmit, departments }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    department: '',
    salary: '',
    hire_date: '',
    manager_id: '',
    job_title: '',
  });


  useEffect(() => {
    if (employee) {
      setFormData({
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        age: employee.age ? String(employee.age) : '', 
        email: employee.email || '',
        department: employee.department || '',
        salary: employee.salary ? String(employee.salary) : '', 
        hire_date: employee.hire_date ? new Date(employee.hire_date).toISOString().split('T')[0] : '',
        manager_id: employee.manager_id ? String(employee.manager_id) : '', 
        job_title: employee.job_title || '',
      });
    } else {
   
      setFormData({
        first_name: '',
        last_name: '',
        age: '',
        email: '',
        department: '',
        salary: '',
        hire_date: '',
        manager_id: '',
        job_title: '',
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const url = employee
        ? `http://localhost:3001/api/user/${employee._id}`
        : 'http://localhost:3001/api/user';
      const method = employee ? 'PUT' : 'POST';
 
      const payload = {
        ...formData,
        age: formData.age ? Number(formData.age) : null,
        salary: formData.salary ? Number(formData.salary) : null,
        manager_id: formData.manager_id ? Number(formData.manager_id) : null,
      };
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      onSubmit();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to save employee data.');
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{employee ? 'Edit Employee' : 'Add Employee'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>First Name</FormLabel>
            <Input name="first_name" value={formData.first_name} onChange={handleChange} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Last Name</FormLabel>
            <Input name="last_name" value={formData.last_name} onChange={handleChange} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Age</FormLabel>
            <Input name="age" type="number" value={formData.age} onChange={handleChange} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Department</FormLabel>
            <Select name="department" value={formData.department} onChange={handleChange}>
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Salary</FormLabel>
            <Input name="salary" type="number" value={formData.salary} onChange={handleChange} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Hire Date</FormLabel>
            <Input name="hire_date" type="date" value={formData.hire_date} onChange={handleChange} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Job Title</FormLabel>
            <Input name="job_title" value={formData.job_title} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditEmployeeForm;