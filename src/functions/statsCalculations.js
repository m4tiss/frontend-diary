import { format } from "date-fns";


export const calculateDaysWithUs = (created_at) => {
    if (!created_at) {
        return 'Invalid date';
    }
  
    const createdDate = new Date(created_at);
  
    if (isNaN(createdDate.getTime())) {
        return 'Invalid date';
    }

    const todayDate = new Date();
    if (isNaN(createdDate.getTime())) {
        throw new RangeError('Invalid time value');
    }
    const diffTime = Math.abs(todayDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export const calculateDaysDiff = (created_date, finish_date) => {
    if (!created_date || !finish_date) {
      return 'Invalid date';
    }
  
    const createdDate = new Date(created_date);
    const finishDate = new Date(finish_date);
  
    if (isNaN(createdDate.getTime()) || isNaN(finishDate.getTime())) {
      return 'Invalid date';
    }
  
    const diffTime = Math.abs(finishDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };