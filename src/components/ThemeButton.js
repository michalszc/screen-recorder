import { Button, Flex, Spacer, Icon, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

function ThemeButton() {
    const { colorMode, toggleColorMode } = useColorMode();
    
return (
        <Flex minWidth='max-content' padding='10px'>
            <Spacer />
            <Button colorScheme='teal' variant='outline' onClick={toggleColorMode}>
                <Icon as={ colorMode === 'dark' ? FaSun : FaMoon} />
            </Button>
        </Flex>
    );
}
  
export default ThemeButton;
