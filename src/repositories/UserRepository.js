import HTTP from "@/common/http";
import { find } from "@/repositories/EventRepository";

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
  async findUserUpcomingEvents(id, query, sort) {
    return find(`${resource}/${id}/events/upcoming`, query, sort);
  },
  async findUserPastEvents(id, query, sort) {
    return find(`${resource}/${id}/events/past`, query, sort);
  },
  async findUserUnreviewedEvents(id, query, sort) {
    return find(`${resource}/${id}/events/unreviewed`, query, sort);
  },
  async findUserRejectedEvents(id, query, sort) {
    return find(`${resource}/${id}/events/rejected`, query, sort);
  },
  async findUserSavedUpcomingEvents(id, query, sort) {
    return find(`${resource}/${id}/events/saved/upcoming`, query, sort);
  },
  async findUserSavedPastEvents(id, query, sort) {
    return find(`${resource}/${id}/events/saved/past`, query, sort);
  },
  async findUserSubscribedUpcomingEvents(id, query, sort) {
    return find(`${resource}/${id}/events/subscribed/upcoming`, query, sort);
  },
  async findUserSubscribedPastEvents(id, query, sort) {
    return find(`${resource}/${id}/events/subscribed/past`, query, sort);
  },
  async save(user) {
    if (user.id) {
      return (await HTTP.put(`${resource}/${user.id}`, user)).data;
    } else {
      return (await HTTP.post(`${resource}`, user)).data;
    }
  },
};
