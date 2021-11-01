import React from "react";
import { Text, Modal } from "native-base";

function ActivityModalWindow(props) {
  const displaySingleActivity = (props) => {
    const { activityDataById } = props.activityDataById;

    if (props.showSingleActivityModal) {
      return activityDataById.map((activity) => {
        return (
          <div key={activity.id.toString()}>
            <Modal
              isOpen={props.ActivityModalWindow}
              onClose={() => props.setShowSingleActivityModal(false)}
            >
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Contact Us</Modal.Header>
                <Modal.Body>
                  <Text>Hello from winodow</Text>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal.Content>
            </Modal>
          </div>
        );
      });
    } else {
      return <Text>No activity</Text>;
    }
  };

  return <>{displaySingleActivity(props)}</>;
}

export default ActivityModalWindow;
