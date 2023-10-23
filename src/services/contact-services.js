import axios from "axios"
import * as endPoints from '../constants/api-constants'

class ContactService {

  static getContacts = async () => {
    return axios.get(endPoints.getContacts);
  }

  static getContact = async (id) => {
    return axios.get(`${endPoints.getContact}/${id}`);
  }

  static addContact = async (data) => {
    return axios.post(`${endPoints.addContact}`, data);
  }

  static deleteContact = async (id) => {
    return axios.delete(`${endPoints.deleteContact}/${id}`);
  }

  static updateContact = async ( id, data ) => {
    return axios.put(`${endPoints.updateContact}/${id}`, data);
  }
}

export default ContactService;