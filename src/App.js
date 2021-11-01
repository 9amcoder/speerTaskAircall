import {
  Box,
  Text,
  HStack,
  Heading,
  Switch,
  useColorMode,
  VStack,
  Center,
} from "native-base";
import "./css/body.css";
import "./css/app.css";
import "./css/header.css";
import Header from "./components/Header";
import ActivityFeedPage from "./Pages/ActivityFeedPage";
import ArchivePage from "./Pages/ArchivePage";
import { Route, Link } from "wouter";

function App() {
  const { colorMode } = useColorMode();

  return (
    <>
      <Header />
      <Center>
        <Box
          bg={colorMode === "light" ? "coolGray.50" : "coolGray.900"}
          w="375px"
          h="100%"
          justifyContent="center"
          px={4}
        >
          <VStack mb={5} space={3} alignItems="center">
            <Heading size="lg">Welcome to Air</Heading>
            <ToggleDarkMode />
            <HStack space={5}>
              <Box
                p={1}
                borderWidth={2}
                borderColor="cyan.500"
                borderTopWidth={5}
              >
                <Link href="/">
                  <Text>All Activity</Text>
                </Link>
              </Box>

              <Box
                p={1}
                borderWidth={2}
                borderColor="cyan.500"
                borderTopWidth={5}
              >
                <Link href="/archive">
                  <Text>Archive</Text>
                </Link>
              </Box>
            </HStack>
            <Route path="/archive" component={ArchivePage} />
            <Route path="/" component={ActivityFeedPage} />
            {/* <ActivityFeedPage /> */}
          </VStack>
        </Box>
      </Center>
    </>
  );
}

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack alignItems="center" space={2}>
      <Text fontSize="xs">Dark</Text>
      <Switch
        isChecked={colorMode === "light" ? true : false}
        onToggle={toggleColorMode}
        accessibilityLabel={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text fontSize="xs">Light</Text>
    </HStack>
  );
}

export default App;
