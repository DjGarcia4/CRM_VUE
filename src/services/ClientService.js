import axios from "axios";

export default {
  getClients() {
    return axios.get("http://localhost:4000/clients");
  },
  addClient(data) {
    return axios.post("http://localhost:4000/clients", data);
  },
  getClient(id) {
    return axios.get(`http://localhost:4000/clients/${id}`);
  },
  updateClient(id, data) {
    return axios.patch(`http://localhost:4000/clients/${id}`, data);
  },
  changeState(id, data) {
    return axios.patch(`http://localhost:4000/clients/${id}`, data);
  },
  deleteClient(id) {
    return axios.delete(`http://localhost:4000/clients/${id}`);
  },
};
