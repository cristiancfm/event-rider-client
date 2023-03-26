import HTTP from "@/common/http";

const resource = "events";

function applyDate(event) {
  event.startingDate = new Date(event.startingDate);
  event.endingDate = new Date(event.endingDate);
  return event;
}

export default {
  async findAll(query, sort) {
    const params = new URLSearchParams();
    if (query) {
      for (let i = 0; i < query.length; i++) {
        params.append(query[i].name, query[i].value);
      }
    }
    if (sort) params.append("sort", sort);
    const paramsStr = params.toString();
    let url = resource;
    if (paramsStr) url += "?" + paramsStr;
    const response = await HTTP.get(url);
    response.data.forEach(applyDate);
    return response.data;
  },
  async findOne(id) {
    const event = (await HTTP.get(`${resource}/${id}`)).data;
    return applyDate(event);
  },
  async save(event) {
    if (event.id) {
      return (await HTTP.put(`${resource}/${event.id}`, event)).data;
    } else {
      return (await HTTP.post(`${resource}`, event)).data;
    }
  },
};
