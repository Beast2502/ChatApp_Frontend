import React from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import Avator from "../../assets/user.svg";
const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  // console.log(recipientUser, "Receip user");

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={Avator} height="35px" alt="Avator"/>
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Message</div>
        </div>
      </div>

      <div className="d-flex flex-column align-items-end">
        <div className="date">12/12/2022</div>
        <div className="this-user-notifications">2</div>
        <span className="user-online"></span>
      </div>
    </Stack>
  );
};

export default UserChat;
