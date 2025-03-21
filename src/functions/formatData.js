import { format } from "date-fns";

export const formattedData = (distance) => {
  return distance.toFixed(1);
};

export function formattedDate(dateString) {
  if (!dateString) {
      return 'Invalid date';
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
      return 'Invalid date';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export const formattedTime = (dateString) => {
  if (!dateString) {
    return 'Invalid time';
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const hours = String(date.getUTCHours()).padStart(2, '0'); 
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};


export const formattedDuration = (duration) => {

  if (!duration || duration === "00:00:00") {
    return '00:00:00';
  }
  
  const [hours, minutes, seconds] = duration.split(":").map(Number);
  let formatted = "";

  if (hours > 0) {
    formatted += `${hours}h `;
  }
  if (minutes > 0) {
    formatted += `${minutes}min `;
  }
  if (seconds > 0) {
    formatted += `${seconds}sec`;
  }

  return formatted.trim();
};
