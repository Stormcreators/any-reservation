
const blockingStatuses = ["pending", "confirmed"];

export function isActiveReservation(reservation) {
  return blockingStatuses.includes(reservation.status);
}

export function timesOverlap(startA, endA, startB, endB) {
  return (
    new Date(startA).getTime() < new Date(endB).getTime() &&
    new Date(endA).getTime() > new Date(startB).getTime()
  );
}

export function isSlotAvailable({
  businessId,
  staffId = null,
  startTime,
  endTime,
  reservations = [],
  excludeReservationId = null
}) {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  if (!Number.isFinite(start) ||
      !Number.isFinite(end) ||
      end <= start) {
    return false;
  }

  return !reservations.some((reservation) => {
    if (reservation.id === excludeReservationId) {
      return false;
    }

    if (reservation.businessId !== businessId) {
      return false;
    }

    if (!isActiveReservation(reservation)) {
      return false;
    }

    if (
      staffId &&
      reservation.staffId &&
      reservation.staffId !== staffId
    ) {
      return false;
    }

    return timesOverlap(
      startTime,
      endTime,
      reservation.startTime,
      reservation.endTime
    );
  });
}

export function getAvailableSlots({
  businessId,
  staffId = null,
  date,
  durationMinutes = 60,
  reservations = [],
  openingHour = 9,
  closingHour = 22,
  intervalMinutes = 30,
  excludeReservationId = null
}) {
  if (
    !date ||
    durationMinutes <= 0 ||
    intervalMinutes <= 0
  ) {
    return [];
  }

  const opening = new Date(`${date}T00:00:00`);
  opening.setHours(openingHour, 0, 0, 0);

  const closing = new Date(`${date}T00:00:00`);
  closing.setHours(closingHour, 0, 0, 0);

  const slots = [];

  for (
    let time = opening.getTime();
    time + durationMinutes * 60000 <= closing.getTime();
    time += intervalMinutes * 60000
  ) {
    const startTime = new Date(time).toISOString();

    const endTime = new Date(
      time + durationMinutes * 60000
    ).toISOString();

    if (time <= Date.now()) {
      continue;
    }

    if (
      isSlotAvailable({
        businessId,
        staffId,
        startTime,
        endTime,
        reservations,
        excludeReservationId
      })
    ) {
      slots.push({ startTime, endTime });
    }
  }

  return slots;
}
