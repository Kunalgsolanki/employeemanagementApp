// src/components/Chart1.js
import React, { useEffect, useState } from 'react';
import {
  Center,
  Text,
  Flex,
  Box,
  Button,
  Checkbox,
} from '@chakra-ui/react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

// Custom hook to get window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

const Chart1 = () => {
  const [postData, setPostData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [show, setShow] = useState(false);
  const dataPerPage = 10;
  const { width } = useWindowSize(); // Get window width

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/user');
      const data = await response.json();

      const transformedData = data.map((item, index) => ({
        ...item,
        id: index + 1,
      }));

      setPostData(transformedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNext = () => {
    if (startIndex + dataPerPage < postData.length) {
      setStartIndex(startIndex + dataPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - dataPerPage >= 0) {
      setStartIndex(startIndex - dataPerPage);
    }
  };

  const handleCheckbox = () => {
    setShow(!show);
  };

  // Responsive chart dimensions
  const chartWidth = width ? Math.min(width * 0.9, 800) : 730; // 90% of viewport width, max 800px
  const chartHeight = width < 480 ? 250 : 350; // Smaller height for mobile

  return (
    <Flex
      direction="column"
      align="center"
      p={{ base: 2, md: 4 }}
      minH="100vh"
      bg="gray.50"
    >
      <Center
        border={{ base: '1px solid black', md: '2px solid black' }}
        bg="gray.700"
        h={{ base: '80px', md: '100px' }}
        w="100%"
        color="white"
        mb={{ base: 4, md: 6 }}
      >
        <Text
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
          fontWeight="bold"
          textAlign="center"
        >
          Salary vs Person
        </Text>
      </Center>

      <Box
        mt={{ base: 4, md: 6 }}
        w="100%"
        overflowX="auto" // Allow horizontal scroll on small screens
      >
        <Center>
          <LineChart
            width={chartWidth}
            height={chartHeight}
            data={postData.slice(startIndex, startIndex + dataPerPage)}
            margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {show ? (
              <XAxis
                dataKey="id"
                fontSize={{ base: 12, md: 14 }}
                angle={width < 480 ? -45 : 0} // Rotate labels on mobile
                textAnchor={width < 480 ? 'end' : 'middle'}
              />
            ) : (
              <XAxis
                dataKey="first_name"
                fontSize={{ base: 12, md: 14 }}
                angle={width < 480 ? -45 : 0} // Rotate labels on mobile
                textAnchor={width < 480 ? 'end' : 'middle'}
              />
            )}
            <YAxis fontSize={{ base: 12, md: 14 }} />
            <Tooltip
              contentStyle={{
                fontSize: width < 480 ? '12px' : '14px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: width < 480 ? '12px' : '14px' }} />
            <Line
              type="monotone"
              dataKey="salary"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Salary"
            />
            {/* Removed the Line for first_name as it’s not numerical */}
          </LineChart>
        </Center>
      </Box>

      <Center mt={{ base: 4, md: 6 }}>
        <Flex
          gap={{ base: 2, md: 4 }}
          direction={{ base: 'column', md: 'row' }}
          align="center"
        >
          <Button
            size={{ base: 'sm', md: 'md' }}
            onClick={handlePrev}
            isDisabled={startIndex === 0}
            colorScheme="blue"
          >
            Previous
          </Button>
          <Button
            size={{ base: 'sm', md: 'md' }}
            onClick={handleNext}
            isDisabled={startIndex + dataPerPage >= postData.length}
            colorScheme="blue"
          >
            Next
          </Button>
          <Checkbox
            isChecked={show}
            onChange={handleCheckbox}
            size={{ base: 'sm', md: 'md' }}
            colorScheme="blue"
          >
            <Text fontSize={{ base: 'sm', md: 'md' }}>Show ID</Text>
          </Checkbox>
        </Flex>
      </Center>
    </Flex>
  );
};

export default Chart1;