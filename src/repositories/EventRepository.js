import HTTP from "@/common/http";

const resource = "events";

function applyDate(event) {
  event.startingDate = dateToISOLikeButLocal(new Date(event.startingDate));
  event.endingDate = dateToISOLikeButLocal(new Date(event.endingDate));
  return event;
}

function dateToISOLikeButLocal(date) {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const msLocal = date.getTime() - offsetMs;
  const dateLocal = new Date(msLocal);
  const iso = dateLocal.toISOString();
  const isoLocal = iso.slice(0, 19);
  return isoLocal;
}

function createParams(query, sort) {
  const params = new URLSearchParams();
  if (query) {
    for (let i = 0; i < query.length; i++) {
      params.append(query[i].name, query[i].value);
    }
  }
  if (sort) params.append("sort", sort);
  return params.toString();
}

export async function find(url, query, sort) {
  const paramsStr = createParams(query, sort);
  if (paramsStr) url += "?" + paramsStr;
  const response = await HTTP.get(url);
  response.data.forEach(applyDate);
  return response.data;
}

export default {
  async findAll(query, sort) {
    return find(resource, query, sort);
  },
  async findPublishedUpcoming(query, sort) {
    return find(`${resource}/upcoming`, query, sort);
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
  async saveEventImage(id, file) {
    const formData = new FormData();
    formData.append("file", file);
    return (
      await HTTP.post(`${resource}/${id}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  },
  async deleteEventImage(idEvent, idImage) {
    return (await HTTP.delete(`${resource}/${idEvent}/image/${idImage}`)).data;
  },
};
