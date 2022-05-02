import {
  Popover,
  PopoverTrigger,
  IconButton,
  Text,
  Icon,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Heading,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { ImCog } from 'react-icons/im';

import { useUser } from '~providers/user-provider';

const SettingsPopover = ({ ...rest }) => {
  const { timePeriod, setTimePeriod } = useUser();
  const { onOpen } = useDisclosure();

  return (
    <Popover placement="top-end">
      <PopoverTrigger>
        <IconButton
          aria-label="Settings"
          transition="all 0.2s"
          icon={<Icon as={ImCog} />}
          onClick={onOpen}
          {...rest}
          zIndex={100}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent bg="rgba(0, 0, 0, 0.9)" backdropBlur="24px">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody p={4}>
            <Heading mb={4} size="md">
              settings
            </Heading>
            <Text fontSize="sm" mb={2}>
              time period:
            </Text>
            <Select
              size="sm"
              defaultValue={timePeriod}
              onChange={(e) => {
                setTimePeriod(e.target.value);
              }}
            >
              <option value="short_term">Short Term</option>
              <option value="medium_term">Medium Term</option>
              <option value="long_term">Long Term</option>
            </Select>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default SettingsPopover;
