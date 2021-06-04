import http from "../http-common";

const getAll = () => {
    return http.get("/categoria");
};

const get = id => {
    return http.get(`/categoria/${id}`);
};

const create = data => {
    return http.post("/categoria", data);
};

const remove = id => {
    return http.delete(`/categoria/${id}`);
};

export default {
    getAll,
    get,
    create,
    remove
};
