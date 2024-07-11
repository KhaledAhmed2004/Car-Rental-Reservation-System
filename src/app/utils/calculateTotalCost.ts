export const calculateTotalCost = (
  pricePerHour: number,
  startTime: string,
  endTime: string
): number => {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);
  const startTotalHours = startHours + startMinutes / 60;
  const endTotalHours = endHours + endMinutes / 60;
  const duration = endTotalHours - startTotalHours;
  return duration * pricePerHour;
};
