import { Box , Text} from '@chakra-ui/react'
import React from 'react'

const NotFound = () => {
  return (
    <React.Fragment>
        <Box textAlign="center" mt="20">
        <Text fontSize="2xl" mb="4">
            Oops! Page Not Found
        </Text>
        </Box>
    </React.Fragment>
  )
}

export default NotFound