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
  Modal,
  Button,
} from "native-base";
import Moment from "moment";
import ActivityModalWindow from "./ActivityModalWindow";

function AllActivity(props) {
  // console.log(props);

  const [activityDataById, setActivityDataById] = React.useState([]);
  const [showSingleActivityModal, setShowSingleActivityModal] =
    React.useState(false);
  const [getSingleActivityError, setGetSingleActivityError] =
    React.useState(false);
  const [isArchived, setIsArchived] = React.useState(false);

  const DisplayAllActivities = (props) => {
    const { activitiesData } = props;
    // const [updatedActivity, setUpdatedActivity] = React.useState([...props]);

    // React.useEffect(() => {
    //   axios
    //     .get(`${config.GET_ALL_ACTIVITY}`)
    //     .then((response) => {
    //       setUpdatedActivity(response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, []);

    //Formatted Date and time
    Moment.locale("en");

    //get activities by id
    const getActivityById = async (id) => {
      await axios
        .get(`${config.GET_ALL_ACTIVITY}/${id}`)
        .then((res) => {
          console.log(res.data);
          console.log(res.data.id);
          // const parsedData = JSON.parse(res.data);
          setActivityDataById(res.data);
          setShowSingleActivityModal(true);
        })
        .catch((err) => {
          console.log(err);
          setGetSingleActivityError(true);
        });
    };

    //handle status change

    //update activity by id send JSON request body with axios POST method

    // const onPressUpdateActivityById = async (id) => {
    //   setIsArchived(true);

    //   await axios
    //     .post(`${config.GET_ALL_ACTIVITY}/${id}`, {
    //       is_archived: isArchived,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       console.log(res.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

    if (activitiesData.length > 0) {
      return activitiesData.map((activity, index) => {
        console.log(activity.is_archived);
        return (
          <div key={activity.id.toString()}>
            <Center flex={1}>
              {/* SINGLE ACTIVITY MODAL START */}

              {showSingleActivityModal && (
                <Modal
                  isOpen={showSingleActivityModal}
                  onClose={() => setShowSingleActivityModal(false)}
                >
                  <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Activity details</Modal.Header>
                    <Modal.Body>
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
                            {activityDataById.call_type === "missed" && (
                              <Text>Missed Call</Text>
                            )}
                            {activityDataById.call_type === "answered" && (
                              <Text>Answered</Text>
                            )}
                            {activityDataById.call_type === "voicemail" && (
                              <Text>Voicemail</Text>
                            )}
                          </Center>
                        </Box>

                        <Stack p="2" space={1}>
                          <Stack space={1}>
                            <HStack space={5}>
                              <Text
                                fontSize="xs"
                                _light={{ color: "violet.500" }}
                                _dark={{ color: "violet.300" }}
                                fontWeight="500"
                                ml="-0.5"
                                mt="-1"
                              >
                                To: {activityDataById.to}
                              </Text>
                              <Text
                                fontSize="xs"
                                _light={{ color: "#14532d" }}
                                _dark={{ color: "#38bdf8" }}
                                fontWeight="500"
                                ml="-0.5"
                                mt="-1"
                              >
                                From: {activityDataById.from}
                              </Text>
                            </HStack>
                          </Stack>
                          <Text fontSize="xs">Via: {activityDataById.via}</Text>
                          <HStack
                            alignItems="center"
                            space={4}
                            justifyContent="space-between"
                          >
                            <VStack alignItems="start">
                              <Text
                                _light={{ color: "gray.500" }}
                                _dark={{ color: "#d1fae5" }}
                                fontWeight="400"
                              >
                                Duration: {activityDataById.duration} min
                              </Text>
                              <Text
                                _light={{ color: "gray.500" }}
                                _dark={{ color: "#d1fae5" }}
                                fontWeight="400"
                              >
                                {Moment(activityDataById.created_at).format(
                                  "DD MMM YYYY, h:mm:ss a"
                                )}
                              </Text>
                            </VStack>
                          </HStack>
                        </Stack>
                      </Box>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                  </Modal.Content>
                </Modal>
              )}

              {/* SINGLE ACTIVITY MODAL END */}

              {/* ALL ACTIVITY LIST START */}
              {!activity.is_archived && (
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
                            _light={{ color: "#14532d" }}
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
                          <Text
                            _light={{ color: "gray.500" }}
                            _dark={{ color: "#d1fae5" }}
                            fontWeight="400"
                          >
                            Duration: {activity.duration} min
                          </Text>
                          <HStack space={12}>
                            <Text
                              _light={{ color: "gray.500" }}
                              _dark={{ color: "#d1fae5" }}
                              fontWeight="400"
                            >
                              {Moment(activity.created_at).format(
                                "DD MMM YYYY, h:mm:ss a"
                              )}
                            </Text>
                            <Button
                              // onPress={() =>
                              //   onPressUpdateActivityById(activity.id)
                              // }
                              size="xs"
                            >
                              Archive
                            </Button>
                          </HStack>
                        </VStack>
                      </HStack>
                    </Stack>
                  </Box>
                </Link>
              )}

              {/* ALL ACTIVITY LIST END */}
            </Center>
          </div>
        );
      });
    } else {
      return <p>No call activities to display</p>;
    }
  };

  return (
    <>
      {DisplayAllActivities(props)}
      {/* <ActivityModalWindow activityDataById={activityDataById} /> */}
    </>
  );
}

export default AllActivity;
