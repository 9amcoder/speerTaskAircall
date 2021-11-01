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
  Modal,
  Button,
} from "native-base";
import Moment from "moment";

function AllActivity(props) {
  const [activityDataById, setActivityDataById] = React.useState([]);
  const [showSingleActivityModal, setShowSingleActivityModal] =
    React.useState(false);

  const DisplayAllActivities = (props) => {
    const { activitiesData } = props;

    Moment.locale("en");

    //get activities by id
    const getActivityById = async (id) => {
      await axios
        .get(`${config.GET_ALL_ACTIVITY}/${id}`)
        .then((res) => {
          setActivityDataById(res.data);
          setShowSingleActivityModal(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //handle status change

    //update activity by id send JSON request body with axios POST method

    const onPressUpdateActivityById = async (id) => {
      await axios
        .post(`${config.GET_ALL_ACTIVITY}/${id}`, {
          is_archived: true,
        })
        .then((res) => {
          window.location.reload(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (activitiesData.length > 0) {
      return activitiesData.map((activity, index) => {
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
                                uri: "https://i.postimg.cc/y6m5fszr/Blurred-Landscape-Background-Twitter-Header-2.png",
                              }}
                              alt="image"
                            />
                          </AspectRatio>

                          {activityDataById.call_type === "missed" && (
                            <Center
                              bg="#e11d48"
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
                              <Text>Missed Call</Text>
                            </Center>
                          )}
                          {activityDataById.call_type === "answered" && (
                            <Center
                              bg="#059669"
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
                              <Text>Answered</Text>
                            </Center>
                          )}
                          {activityDataById.call_type === "voicemail" && (
                            <Center
                              bg="#0284c7"
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
                              <Text>Voicemail</Text>
                            </Center>
                          )}
                          {/* </Center> */}
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
                                fontSize="xs"
                                _light={{ color: "#14532d" }}
                                _dark={{ color: "#38bdf8" }}
                                fontWeight="500"
                                ml="-0.5"
                                mt="-1"
                              >
                                {activityDataById.direction}
                              </Text>
                              <Text
                                _light={{ color: "gray.500" }}
                                _dark={{ color: "#d1fae5" }}
                                fontWeight="400"
                                fontSize="xs"
                              >
                                Duration: {activityDataById.duration} min
                              </Text>
                              <Text
                                _light={{ color: "gray.500" }}
                                _dark={{ color: "#d1fae5" }}
                                fontWeight="400"
                                fontSize="xs"
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
                            uri: "https://i.postimg.cc/y6m5fszr/Blurred-Landscape-Background-Twitter-Header-2.png",
                          }}
                          alt="image"
                        />
                      </AspectRatio>

                      {activity.call_type === "missed" && (
                        <Center
                          bg="#e11d48"
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
                          <Text>Missed Call</Text>
                        </Center>
                      )}
                      {activity.call_type === "answered" && (
                        <Center
                          bg="#059669"
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
                          <Text>Answered</Text>
                        </Center>
                      )}
                      {activity.call_type === "voicemail" && (
                        <Center
                          bg="#0284c7"
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
                          <Text>Voicemail</Text>
                        </Center>
                      )}
                      {/* </Center> */}
                    </Box>

                    <Stack p="2" space={1}>
                      <Stack space={1}>
                        <HStack space={5}>
                          {/* <Text
                            fontSize="xs"
                            _light={{ color: "violet.500" }}
                            _dark={{ color: "violet.300" }}
                            fontWeight="500"
                            ml="-0.5"
                            mt="-1"
                          >
                            To: {activity.to}
                          </Text> */}
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
                      {/* <Text fontSize="xs">Via: {activity.via}</Text> */}
                      <HStack
                        alignItems="center"
                        space={4}
                        justifyContent="space-between"
                      >
                        <VStack alignItems="start">
                          {/* <Text
                            _light={{ color: "gray.500" }}
                            _dark={{ color: "#d1fae5" }}
                            fontWeight="400"
                          >
                            Duration: {activity.duration} min
                          </Text> */}
                          <HStack space={12}>
                            <Text
                              _light={{ color: "gray.500" }}
                              _dark={{ color: "#d1fae5" }}
                              fontWeight="400"
                              fontSize="xs"
                            >
                              {Moment(activity.created_at).format(
                                "DD MMM YYYY, h:mm:ss a"
                              )}
                            </Text>
                            <Button
                              onPress={() =>
                                onPressUpdateActivityById(activity.id)
                              }
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
      <Text>All Calls</Text>
      {DisplayAllActivities(props)}
    </>
  );
}

export default AllActivity;
