import HTTP from "@/common/http";

const resource = "users";

function applyDate(event) {
  event.startingDate = new Date(event.startingDate);
  event.endingDate = new Date(event.endingDate);
  return event;
}

export default {
  async findAllWithEvents() {
    const response = await HTTP.get(`${resource}/with-events`);
    response.data.forEach(function (user) {
      user.hostedEvents.forEach(applyDate);
      user.upcomingHostedEvents.forEach(applyDate);
      user.pastHostedEvents.forEach(applyDate);
    });
    return response.data;
  },
  async findOne(id) {
    const response = await HTTP.get(`${resource}/${id}`);
    return response.data;
  },
  async findOneWithEvents(id) {
    const response = await HTTP.get(`${resource}/${id}/with-events`);
    response.data.hostedEvents.forEach(applyDate);
    response.data.upcomingHostedEvents.forEach(applyDate);
    response.data.pastHostedEvents.forEach(applyDate);
    return response.data;
  },
};
