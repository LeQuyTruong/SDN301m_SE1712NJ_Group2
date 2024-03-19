import axiosClient from "./axiosClient";
import { buildFilter } from "./common";

const bookingApiPayment = {

    async index(params) {
        try {
          let filters = buildFilter(params);
          return await axiosClient.get(`admin/booking`, {params: filters});
        } catch (error) {
          return {
            status: 'error'
          }
        }
      },
  
      async updatePayment(id, data) {
        try {
          return await axiosClient.put(`admin/booking/updatePayment/${id}`, data);
        } catch (error) {
          return {
            status: 'error'
          };
        }
      },
async findById(id) {
    try {
        return await axiosClient.get(`admin/booking/${id}`);
    } catch (error) {
        return {
            status: 'error'
        }
    }
},
async delete(id) {
    try {
        return await axiosClient.delete(`admin/booking/updatePayment/${id}`);
    } catch (error) {
        return {
            status: 'error'
        }
    }
},

}
export default bookingApiPayment;