import React from "react";
import axios from "axios";
import { config } from "../config/config";
import {
  Link,
  VStack,
  Center,
  Text,
  Box,
  AspectRatio,
  Stack,
  HStack,
  Image,
  Heading,
} from "native-base";

function AllActivity(props) {
  const [activityId, setActivityId] = React.useState(null);

  const displayAllActivities = (props) => {
    const { activitiesData } = props;

    //convert data to json

    //Switch to set the call type

    //get activities by id
    const getActivityById = (id) => {
      axios
        .get(`${config.GET_ALL_ACTIVITY}/${id}`)
        .then((res) => {
          console.log(res.data);
          setActivityId(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (activitiesData.length > 0) {
      return activitiesData.map((activity, index) => {
        return (
          <div key={index}>
            {/* <Center flex={1}>
              <VStack space={5}>
                <Link onPress={() => getActivityById(activity.id)}>
                  <Box>
                    <Text>{activity.id}</Text>
                    <Text>{activity.created_at}</Text>
                    <Text>{activity.direction}</Text>
                    <Text>{activity.from}</Text>
                    <Text>{activity.to}</Text>
                    <Text>{activity.via}</Text>
                    <Text>{activity.duration}</Text>
                    <Text>{activity.is_archived}</Text>
                    <Text>{activity.call_type}</Text>
                  </Box>
                </Link>
              </VStack>
            </Center> */}
            <Box
              rounded="lg"
              overflow="hidden"
              width="72"
              shadow={1}
              _light={{ backgroundColor: "gray.50" }}
              _dark={{ backgroundColor: "gray.700" }}
            >
              <Box>
                <AspectRatio ratio={16 / 2}>
                  <Image
                    source={{
                      uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                    }}
                    alt="image"
                  />
                </AspectRatio>
                <Center
                  bg="violet.500"
                  _text={{ color: "white", fontWeight: "700", fontSize: "xs" }}
                  position="absolute"
                  bottom={0}
                  px="3"
                  py="1.5"
                >
                  {/* {activity.call_type} */}
                  {activity.call_type === "missed" && <Text>Missed Call</Text>}
                  {activity.call_type === "answered" && <Text>Answered</Text>}
                  {activity.call_type === "voicemail" && <Text>Voicemail</Text>}
                </Center>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    {activity.from}
                  </Heading>
                  <Text
                    fontSize="xs"
                    _light={{ color: "violet.500" }}
                    _dark={{ color: "violet.300" }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                  >
                    {activity.to}
                  </Text>
                </Stack>
                <Text fontWeight="400">{activity.via}</Text>
                <HStack
                  alignItems="center"
                  space={4}
                  justifyContent="space-between"
                >
                  <HStack alignItems="center">
                    <Text color="gray.500" fontWeight="400">
                      {activity.duration}
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </div>
        );
      });
    } else {
      return <p>No activities to display</p>;
    }
  };

  return <>{displayAllActivities(props)}</>;
}

export default AllActivity;
