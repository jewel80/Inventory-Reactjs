import moment from "moment";
import {dateTimeFormat} from "./CommonStings";

const Helper = () => {
  const getSerialNumber = (dataSource, record, currentPage, perPage) => {
    return ((currentPage-1)*perPage) + (dataSource.indexOf(record)+1)
  }

  const formatDate = (dateTime) => {
    if(! dateTime) {
      return '';
    }
    return moment(dateTime).format(dateTimeFormat)
  }

  const getErrorMessage = (error) => {
    if(typeof error === 'string' || error instanceof String) {
      return error;
    }

    if(error.response) {
      if(error.response.data) {
        let message = '';
        if(error.response.data.data) {
          message = error.response.data.data.join(" ");
        }
        return error.response.data?.message ? (error.response.data?.message + " \n" + message) : "Something Went Wrong!"
      }
    }

    return "Something Went Wrong!";
  }

  return {
    formatDate,
    getErrorMessage,
    getSerialNumber
  }
}

export default Helper