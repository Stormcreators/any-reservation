import { isSlotAvailable } from "./availability";

export function validateReservation({
  reservation,
  business,
  service,
  reservations = [],
  bookingFields = [],
  staff = [],
  excludeReservationId = null
}) {
  const errors = [];

  if (!business) {
    errors.push("Изберете бизнес.");
  }

  if (
    !service ||
    !service.active ||
    service.businessId !== business?.id
  ) {
    errors.push("Изберете валидна услуга.");
  }

  if (!reservation.customerId) {
    errors.push("Липсва клиент.");
  }

  const start = new Date(reservation.startTime).getTime();
  const end = new Date(reservation.endTime).getTime();

  const validTimes =
    Number.isFinite(start) &&
    Number.isFinite(end) &&
    end > start;

  if (!validTimes) {
    errors.push("Невалидна дата или час.");
  } else {
    if (start <= Date.now()) {
      errors.push("Резервацията трябва да бъде в бъдещето.");
    }

    if (
      service &&
      end - start !== service.durationMinutes * 60000
    ) {
      errors.push("Невалидна продължителност на резервацията.");
    }
  }

  if (service?.requiresStaff && !reservation.staffId) {
    errors.push("Изберете служител.");
  }

  if (reservation.staffId) {
    const employee = staff.find(
      (person) =>
        person.id === reservation.staffId &&
        person.businessId === business?.id &&
        person.active &&
        person.serviceIds.includes(service?.id)
    );

    if (!employee) {
      errors.push("Невалиден служител.");
    }
  }

  for (const field of bookingFields) {
    const value =
      field.id === "guests"
        ? reservation.guests
        : field.type === "staff"
          ? reservation.staffId
          : reservation.customFields?.[field.id];

    const missing =
      value == null || String(value).trim() === "";

    if (field.required && missing) {
      errors.push(`Попълнете: ${field.label}`);
      continue;
    }

    if (!missing && field.type === "number") {
      const number = Number(value);

      if (
        !Number.isFinite(number) ||
        (field.min != null && number < field.min) ||
        (field.max != null && number > field.max) ||
        (field.id === "guests" && !Number.isInteger(number))
      ) {
        errors.push(`Невалидна стойност: ${field.label}`);
      }
    }

    if (
      !missing &&
      field.type === "select" &&
      !field.options?.includes(value)
    ) {
      errors.push(`Невалиден избор: ${field.label}`);
    }
  }

  if (
    business &&
    validTimes &&
    !isSlotAvailable({
      businessId: business.id,
      staffId: reservation.staffId,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      reservations,
      excludeReservationId
    })
  ) {
    errors.push("Избраният час вече е зает.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
