import React from "react";

const createEventList = data => {
  return data.map((val, key) => {
    return (
      <li>
        <h2>{val.eventName}</h2>
        <p>
          <span>Date : </span>
          {val.eventDate} | <span>Time :</span> {val.eventTime}
        </p>
        <p>{val.eventDetail}</p>
      </li>
    );
  });
};

const EventDetail = props => {
  return (
    <div className="event-details">
      <h3>Event Details</h3>
      <ul>{createEventList(props.data)}</ul>

      <p
        className="resetLink"
        onClick={e => {
          props.reset();
        }}
      >
        Create another event
      </p>
    </div>
  );
};

export default EventDetail;
