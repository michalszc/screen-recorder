import { Divider, Select, Center, HStack, VStack } from '@chakra-ui/react';
import Video from './Video';
import ThemeButton from './ThemeButton';
import RecordButton from './RecordButton';

function App() {
  return (
    <>
      <ThemeButton />
      <Center>
        <VStack w={'100%'}>
          <Video />
          <Divider margin='20px' maxWidth={'90%'}/>    
          <HStack spacing='24px'>
            <RecordButton />
            <Select placeholder='Select file type'>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
            <Select placeholder='Select source'>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
          </HStack>
        </VStack>
      </Center>
    </>
  );
}

export default App;
