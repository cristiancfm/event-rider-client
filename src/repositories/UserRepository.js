import HTTP from "@/common/http";

const resource = "users";

function applyDate(event) {
  event.startingDate = new Date(event.startingDate);
  event.endingDate = new Date(event.endingDate);
  return event;
}

export default {
  async findAll() {
    const response = await HTTP.get(resource);
    response.data.forEach(function (user) {
      user.hostedEvents.forEach(applyDate);
      user.upcomingHostedEvents.forEach(applyDate);
      user.pastHostedEvents.forEach(applyDate);
    });
    return response.data;
  },
  async findOne(id) {
    const response = await HTTP.get(`${resource}/${id}`);
    response.data.hostedEvents.forEach(applyDate);
    response.data.upcomingHostedEvents.forEach(applyDate);
    response.data.pastHostedEvents.forEach(applyDate);
    return response.data;
  },
};
