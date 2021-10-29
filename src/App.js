import {
  Box,
  Image,
  Text,
  HStack,
  Heading,
  Switch,
  useColorMode,
  VStack,
  Code,
  Center,
} from "native-base";
import "./css/body.css";
import "./css/app.css";
import "./css/header.css";
import Header from "./components/Header";
import ActivityFeedPage from "./Pages/ActivityFeedPage";
import ArchivePage from "./Pages/ArchivePage";

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
          <VStack space={5} alignItems="center">
            <Heading size="lg">Welcome to Air</Heading>
            <ToggleDarkMode />
            <ActivityFeedPage />
          </VStack>
        </Box>
      </Center>
    </>
  );
}

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2}>
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light" ? true : false}
        onToggle={toggleColorMode}
        accessibilityLabel={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}

export default App;
