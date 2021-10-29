import * as React from "react";
import axios from "axios";
import { config } from "../config/config";
import {
  Box,
  Image,
  Text,
  Link,
  HStack,
  Heading,
  Switch,
  useColorMode,
  VStack,
  Code,
  Center,
  FlatList,
  Spinner,
} from "native-base";
import AllActivity from "../components/AllActivity";

function ActivityFeedPage() {
  const [activitiesData, setActivitiesData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    getAllActivity();
  }, []);

  // Get the activities data asynchronously with axios
  const getAllActivity = async () => {
    try {
      const response = await axios.get(`${config.GET_ALL_ACTIVITY}`);
      setActivitiesData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <Center flex={1}>
      <Box> Fetch API</Box>
      {isLoading ? (
        <Spinner accessibilityLabel="Loading posts" />
      ) : (
        <AllActivity activitiesData={activitiesData} />
      )}
      {error && <Text>Something went wrong ...</Text>}
    </Center>
  );
}

export default ActivityFeedPage;
