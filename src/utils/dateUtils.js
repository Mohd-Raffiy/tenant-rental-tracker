// Calculates how many days have passed since a given date
export const calculateDaysSince = (dateString) => {
  const today = new Date();
  const enteredDate = new Date(dateString);
  const diffTime = today - enteredDate; // difference in milliseconds
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // convert to days
};

// Returns rent status (color + label) based on days passed
export const getRentStatus = (days) => {
  if (days > 30) {
    return { color: "red", label: `Delayed by ${days - 30} days` };
  } else if (days >= 27) {
    return { color: "red", label: `Due in ${30 - days} days` };
  } else if (days >= 20) {
    return { color: "orange", label: `Due in ${30 - days} days` };
  }
  return { color: "green", label: `Due in ${30 - days} days` };
};
