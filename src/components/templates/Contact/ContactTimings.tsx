import { Container, Flex, Stack, Heading, HStack, Divider, Text, Box } from '@chakra-ui/react';
import { FC } from 'react';

interface IContactTimingsProps {
  contactDetails: {
    text: string;
    icon: JSX.Element;
  }[];
}

const ContactTimings: FC<IContactTimingsProps> = ({ contactDetails }) => {
  const timings = [
    {
      day: 'Montag',
      time: '09:00-18:00',
    },
    {
      day: 'Dienstag',
      time: '08:00-16:00',
    },
    {
      day: 'Mittwoch',
      time: '08:00-16:00',
    },
    {
      day: 'Donnerstag',
      time: '08:00-16:00',
    },
    {
      day: 'Freitag',
      time: '10:00-19:00',
    },
    {
      day: 'Samstag',
      time: '10:00-18:00',
    },
    {
      day: 'Sonntag',
      time: 'Geschlossen',
    },
  ];
  return (
    <>
      {' '}
      <Container maxW="80rem">
        <Flex align="center" pos="relative" top={{ base: '-5rem', md: '-10rem' }}>
          <Stack spacing={{ md: 2, lg: 8 }} flex="1" display={{ base: 'none', md: 'flex' }}>
            <Heading size="h2418" fontWeight="semibold">
              Partyshop, Lager, Werkstatt & Büro
            </Heading>
            <Stack spacing={{ md: 2, lg: 8 }}>
              {contactDetails.map((item, index) => (
                <HStack key={item.text}>
                  <Box fontSize="xl" color="red.500">
                    {item.icon}
                  </Box>{' '}
                  <Text size="b2012">{item.text}</Text>
                </HStack>
              ))}
            </Stack>
          </Stack>
          <Stack
            p="10"
            bg="white"
            flex="1"
            boxShadow="dark"
            borderRadius="xl"
            mx={{ base: 4, md: '0' }}>
            <Text variant="cursive" size="50" mb="8" textAlign="center">
              Öffnungszeiten
            </Text>
            <Stack spacing={{ base: 2, md: 6, lg: 8 }}>
              {timings.map((item) => (
                <Flex key={item.day} justify="space-between" align="center">
                  <Text w={{ base: '5rem', lg: '7.5rem' }} size="b2012">
                    {item.day}
                  </Text>
                  <Divider h="1px" bg="black" maxW={{ base: '4rem', md: '6rem', lg: '8.2rem' }} />
                  <Text w={{ base: '5rem', lg: '8.2rem' }} size="b2012">
                    {item.time}
                  </Text>
                </Flex>
              ))}
            </Stack>
          </Stack>
        </Flex>
      </Container>
    </>
  );
};
export default ContactTimings;
