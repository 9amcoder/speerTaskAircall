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
  Spinner,
} from "native-base";
import Moment from "moment";

function ArchivePage() {
  const [activityData, setActivityData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedActivity, setSelectedActivity] = React.useState(null);

  React.useEffect(() => {
    getAllActivity();
  }, []);

  const getAllActivity = async () => {
    try {
      const response = await axios.get(`${config.GET_ALL_ACTIVITY}`);
      console.log(response.data);
      setActivityData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getActivityById = async (id) => {
    await axios
      .get(`${config.GET_ALL_ACTIVITY}/${id}`)
      .then((res) => {
        console.log(res.data);
        setSelectedActivity(res.data);
        setModalVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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
                            <HStack space={10}>
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
                              {selectedActivity.call_type === "missed" && (
                                <Text>Missed Call</Text>
                              )}
                              {selectedActivity.call_type === "answered" && (
                                <Text>Answered</Text>
                              )}
                              {selectedActivity.call_type === "voicemail" && (
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
  );
}

export default ArchivePage;
