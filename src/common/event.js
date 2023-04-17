import EventRepository from "@/repositories/EventRepository";
import UserRepository from "@/repositories/UserRepository";
import { getStore } from "@/common/store";

export const EventType = {
  UNREVIEWED: "unreviewed",
  REJECTED: "rejected",
  UPCOMING: "cancelled",
  PAST: "past",
};

function applyFilters(filters) {
  let query = [];
  filters.title ? query.push({ name: "title", value: filters.title }) : "";
  filters.latitude
    ? query.push({ name: "latitude", value: filters.latitude })
    : "";
  filters.longitude
    ? query.push({ name: "longitude", value: filters.longitude })
    : "";
  filters.date ? query.push({ name: "date", value: filters.date }) : "";
  filters.distance
    ? query.push({ name: "distance", value: filters.distance })
    : "";
  filters.category
    ? query.push({ name: "category", value: filters.category })
    : "";
  return query;
}

export async function searchEvents(filters) {
  try {
    const query = applyFilters(filters);
    return await EventRepository.findAll(query, null);
  } catch (err) {
    console.error(err);
  }
}

export async function updateSubscribers(event) {
  if (getStore().state.user.logged) {
    try {
      const account = await UserRepository.findOneBase(
        getStore().state.user.id
      );
      const index = event.subscribers.findIndex(
        (subscriber) => subscriber.id === account.id
      );
      if (index >= 0) {
        //delete subscriber
        event.subscribers.splice(index, 1);
      } else {
        //add subscriber
        event.subscribers.push(account);
      }
      await EventRepository.save(event);
    } catch (err) {
      console.error(err);
    }
  }
}

export async function updateSaves(event) {
  if (getStore().state.user.logged) {
    try {
      const account = await UserRepository.findOneBase(
        getStore().state.user.id
      );
      const index = event.saves.findIndex((save) => save.id === account.id);
      if (index >= 0) {
        //delete save
        event.saves.splice(index, 1);
      } else {
        //add save
        event.saves.push(account);
      }
      await EventRepository.save(event);
    } catch (err) {
      console.error(err);
    }
  }
}
