import { useState, useEffect, useMemo } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import exportFromJSON from 'export-from-json';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date)) return 'Invalid Date';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const useEmployeeData = () => {
  const [originalPosts, setOriginalPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');
  const [updateIconState, setUpdateIconState] = useState([]);

  const departments = ['IT', 'Sales', 'HR', 'Finance', 'Marketing'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch('http://localhost:3001/api/user');
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setOriginalPosts(data);
      setPosts(data);
      setUpdateIconState(Array(data.length).fill(false));
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = useMemo(() => {
    let filtered = [...originalPosts];
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(emp =>
        emp.first_name && emp.first_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedSalary.trim() !== '') {
      filtered = filtered.filter(emp => Number(emp.salary) <= Number(selectedSalary));
    }
    if (selectedAge.trim() !== '') {
      filtered = filtered.filter(emp => Number(emp.age) >= Number(selectedAge));
    }
    if (selectedDepartments.length > 0) {
      filtered = filtered.filter(emp =>
        emp.department && selectedDepartments.includes(emp.department)
      );
    }
    return filtered;
  }, [originalPosts, searchTerm, selectedSalary, selectedAge, selectedDepartments]);

  useEffect(() => {
    setPosts(filteredPosts);
    setUpdateIconState(Array(filteredPosts.length).fill(false));
  }, [filteredPosts]);

  const downloadCsv = () => {
    const data = posts.map(post => ({
      ...post,
      hire_date: new Date(post.hire_date).toISOString(),
    }));
    const fileName = 'employee_data';
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    const headers = [
      ['Employee Id', 'First Name', 'Last Name', 'Age', 'Email', 'Department', 'Salary', 'Hire Date', 'Manager Id', 'Job Title'],
    ];
    const data = posts.map((post, index) => [
      index + 1,
      post.first_name,
      post.last_name,
      post.age,
      post.email,
      post.department,
      post.salary,
      formatDate(post.hire_date),
      post.manager_id,
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
    const data = posts.map(post => ({
      ...post,
      hire_date: formatDate(post.hire_date),
    }));
    const fileName = 'employee_data';
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  };

  return {
    posts,
    setPosts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedAge,
    setSelectedAge,
    selectedSalary,
    setSelectedSalary,
    updateIconState,
    setUpdateIconState,
    departments,
    fetchData,
    handleSearchElement: setSearchTerm,
    handleSalary: setSelectedSalary,
    handleAge: setSelectedAge,
    filterByDepartments: setSelectedDepartments,
    downloadCsv,
    generatePdf,
    downloadXls,
  };
};

export default useEmployeeData;