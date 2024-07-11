"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalCost = void 0;
const calculateTotalCost = (pricePerHour, startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    const startTotalHours = startHours + startMinutes / 60;
    const endTotalHours = endHours + endMinutes / 60;
    const duration = endTotalHours - startTotalHours;
    return duration * pricePerHour;
};
exports.calculateTotalCost = calculateTotalCost;
