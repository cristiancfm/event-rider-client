import HTTP from "@/common/http";

const resource = "events";

function applyDate(event) {
  event.startingDate = new Date(event.startingDate);
  event.endingDate = new Date(event.endingDate);
  return event;
}

export default {
  async findAll() {
    let url = resource;
    const response = await HTTP.get(url);
    response.data.forEach(applyDate);
    return response.data;
  },
  async findOne(id) {
    const event = (await HTTP.get(`${resource}/${id}`)).data;
    return applyDate(event);
  },
};
