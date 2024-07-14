import { format } from "date-fns";

export const formattedData = (distance) => {
  return distance.toFixed(1);
};

export const formattedDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "dd-MM-yyyy");
};

export const formattedTime = (dateString) => {
  const date = new Date(dateString);
  return format(date, "HH:mm");
};

export const formattedDuration = (duration) => {
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
