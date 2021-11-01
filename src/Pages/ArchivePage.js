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
  Spinner,
} from "native-base";
import Moment from "moment";

function ArchivePage() {
  const [activityData, setActivityData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedActivity, setSelectedActivity] = React.useState(null);

  React.useEffect(() => {
    getAllActivity();
  }, []);

  const getAllActivity = async () => {
    try {
      const response = await axios.get(`${config.GET_ALL_ACTIVITY}`);
      // console.log(response.data);
      setActivityData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const resetAllArchive = async () => {
    try {
      await axios.get(`${config.REST_ALL_ACTIVITY}`);
      // console.log(response.data);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getActivityById = async (id) => {
    await axios
      .get(`${config.GET_ALL_ACTIVITY}/${id}`)
      .then((res) => {
        // console.log(res.data);
        setSelectedActivity(res.data);
        setModalVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onPressUpdateActivityById = async (id) => {
    // setIsArchive(false);
    // console.log(isArchive);
    await axios
      .post(`${config.GET_ALL_ACTIVITY}/${id}`, {
        is_archived: false,
      })
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        {isLoading ? (
          <Spinner accessibilityLabel="Loading posts" />
        ) : (
          <div>
            {activityData.map((activity) => {
              return (
                <div key={activity.id.toString()}>
                  {activity.is_archived && (
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
                              bg="#fb923c"
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
                        </Box>

                        <Stack p="2" space={1}>
                          <Stack space={1}>
                            <HStack space={5}>
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
                          <HStack
                            alignItems="center"
                            space={4}
                            justifyContent="space-between"
                          >
                            <VStack alignItems="start">
                              <HStack space={10}>
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
                                  UnArchive
                                </Button>
                              </HStack>
                            </VStack>
                          </HStack>
                        </Stack>
                      </Box>
                    </Link>
                  )}
                  {activity.length === 0 && (
                    <Text>No archived activity found</Text>
                  )}

                  {modalVisible && (
                    <Modal
                      isOpen={modalVisible}
                      onClose={() => setModalVisible(false)}
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

                              {/* {activity.call_type} */}
                              {selectedActivity.call_type === "missed" && (
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
                              {selectedActivity.call_type === "answered" && (
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
                              {selectedActivity.call_type === "voicemail" && (
                                <Center
                                  bg="#fb923c"
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
                                    To: {selectedActivity.to}
                                  </Text>
                                  <Text
                                    fontSize="xs"
                                    _light={{ color: "#14532d" }}
                                    _dark={{ color: "#38bdf8" }}
                                    fontWeight="500"
                                    ml="-0.5"
                                    mt="-1"
                                  >
                                    From: {selectedActivity.from}
                                  </Text>
                                </HStack>
                              </Stack>
                              <Text fontSize="xs">
                                Via: {selectedActivity.via}
                              </Text>
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
                                    {selectedActivity.direction}
                                  </Text>
                                  <Text
                                    _light={{ color: "gray.500" }}
                                    _dark={{ color: "#d1fae5" }}
                                    fontWeight="400"
                                  >
                                    Duration: {selectedActivity.duration} min
                                  </Text>

                                  <Text
                                    _light={{ color: "gray.500" }}
                                    _dark={{ color: "#d1fae5" }}
                                    fontWeight="400"
                                  >
                                    {Moment(selectedActivity.created_at).format(
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
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <Link onPress={resetAllArchive}>
          <Box
            mt={2}
            p={1}
            borderWidth={1}
            borderColor="cyan.500"
            borderTopWidth={2}
          >
            <Text>Unarchive all</Text>
          </Box>
        </Link>
      </div>
    </>
  );
}

export default ArchivePage;
