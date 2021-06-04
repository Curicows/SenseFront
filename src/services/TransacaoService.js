import http from "../http-common";

const getAll = () => {
    return http.get("/transacao");
};

const get = id => {
    return http.get(`/transacao/${id}`);
};

const create = (data) => {
    return http.post("/transacao", data);
};

const update = (id, data) => {
    return http.put(`/transacao/${id}`, data);
};

const remove = id => {
    return http.delete(`/transacao/${id}`);
};

const findByTitle = title => {
    return http.get(`/transacao?title=${title}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByTitle
};
