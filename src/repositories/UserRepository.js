import HTTP from "@/common/http";

const resource = "users";

function applyDate(event) {
  event.startingDate = new Date(event.startingDate);
  event.endingDate = new Date(event.endingDate);
  return event;
}

export default {
  async findAll() {
    const response = await HTTP.get(`${resource}`);
    response.data.forEach(function (user) {
      user.hostedEvents.forEach(applyDate);
      user.upcomingHostedEvents.forEach(applyDate);
      user.pastHostedEvents.forEach(applyDate);
    });
    return response.data;
  },
  async findOne(id) {
    const response = await HTTP.get(`${resource}/${id}`);
    if (response.data.hostedEvents) {
      response.data.hostedEvents.forEach(applyDate);
    }
    if (response.data.upcomingHostedEvents) {
      response.data.upcomingHostedEvents.forEach(applyDate);
    }
    if (response.data.pastHostedEvents) {
      response.data.pastHostedEvents.forEach(applyDate);
    }
    return response.data;
  },
  async findOneBase(id) {
    const response = await HTTP.get(`${resource}/${id}/base`);
    return response.data;
  },
  async save(user) {
    if (user.id) {
      return (await HTTP.put(`${resource}/${user.id}`, user)).data;
    } else {
      return (await HTTP.post(`${resource}`, user)).data;
    }
  },
};
