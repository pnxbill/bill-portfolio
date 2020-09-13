import moment from 'moment';

export const formatDate = date => {
  return date ? moment.unix(date / 1000).format('DD/MM/YYYY') : '';
}