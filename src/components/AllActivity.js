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
import Moment from "moment";
import ActivityModalWindow from "./ActivityModalWindow";

function AllActivity(props) {
  const [activityDataById, setActivityDataId] = React.useState(null);

  const displayAllActivities = (props) => {
    const { activitiesData } = props;

    //Formatted Date and time
    Moment.locale("en");

    //get activities by id
    const getActivityById = async (id) => {
      await axios
        .get(`${config.GET_ALL_ACTIVITY}/${id}`)
        .then((res) => {
          console.log(res.data);
          setActivityDataId(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      //prevent defualt action
    };

    //display activity by id

    if (activitiesData.length > 0) {
      return activitiesData.map((activity, index) => {
        return (
          <>
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

              <Center flex={1}>
                <Link onPress={() => getActivityById(activity.id)}>
                  <Box
                    rounded="lg"
                    overflow="hidden"
                    width="72"
                    shadow={1}
                    _light={{ backgroundColor: "gray.100" }}
                    _dark={{ backgroundColor: "gray.700" }}
                    mt={2}
                  >
                    <Box>
                      <AspectRatio ratio={16 / 1.5}>
                        <Image
                          source={{
                            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                          }}
                          alt="image"
                        />
                      </AspectRatio>
                      <Center
                        bg="violet.500"
                        _text={{
                          color: "white",
                          fontWeight: "700",
                          fontSize: "xs",
                        }}
                        position="absolute"
                        bottom={0}
                        px="3"
                        py="1.5"
                      >
                        {/* {activity.call_type} */}
                        {activity.call_type === "missed" && (
                          <Text>Missed Call</Text>
                        )}
                        {activity.call_type === "answered" && (
                          <Text>Answered</Text>
                        )}
                        {activity.call_type === "voicemail" && (
                          <Text>Voicemail</Text>
                        )}
                      </Center>
                    </Box>

                    <Stack p="2" space={1}>
                      <Stack space={1}>
                        {/* <Heading size="sm" ml="-1">
                      From: {activity.from}
                    </Heading> */}
                        <HStack space={5}>
                          <Text
                            fontSize="xs"
                            _light={{ color: "violet.500" }}
                            _dark={{ color: "violet.300" }}
                            fontWeight="500"
                            ml="-0.5"
                            mt="-1"
                          >
                            To: {activity.to}
                          </Text>
                          <Text
                            fontSize="xs"
                            _light={{ color: "#cffafe" }}
                            _dark={{ color: "#38bdf8" }}
                            fontWeight="500"
                            ml="-0.5"
                            mt="-1"
                          >
                            From: {activity.from}
                          </Text>
                        </HStack>
                      </Stack>
                      <Text fontSize="xs">Via: {activity.via}</Text>
                      <HStack
                        alignItems="center"
                        space={4}
                        justifyContent="space-between"
                      >
                        <VStack alignItems="start">
                          <Text color="gray.500" fontWeight="400">
                            Duration: {activity.duration} min
                          </Text>
                          <Text color="gray.500" fontWeight="400">
                            {Moment(activity.created_at).format(
                              "DD MMM YYYY, h:mm:ss a"
                            )}
                          </Text>
                        </VStack>
                      </HStack>
                    </Stack>
                  </Box>
                </Link>
              </Center>
            </div>
          </>
        );
      });
    } else {
      return <p>No call activities to display</p>;
    }
  };

  return (
    <>
      {displayAllActivities(props)}
      <ActivityModalWindow activityDataById={activityDataById} />
    </>
  );
}

export default AllActivity;
