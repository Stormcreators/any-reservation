import { useState } from "react";
import { getAvailableSlots } from "../../utils/availability";
import { validateReservation } from "../../utils/reservationValidation";
import { businessTemplates } from "../../data/templates/businessTemplates";
import "./BookingForm.css";

function localDate(value = new Date()) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatTime(value) {
  return new Date(value).toLocaleTimeString("bg-BG", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function BookingForm({
  business,
  services = [],
  staff = [],
  reservations = [],
  customerId,
  editingReservation = null,
  onSave,
  onClose
}) {
  const businessServices = services.filter(
    (service) =>
      service.businessId === business.id && service.active
  );

  const template =
    businessTemplates[business.category] ||
    businessTemplates.custom;

  const bookingFields =
    business.bookingFields || template.bookingFields || [];

  const [serviceId, setServiceId] = useState(
    editingReservation?.serviceId ||
    businessServices[0]?.id ||
    ""
  );

  const [date, setDate] = useState(
    localDate(editingReservation?.startTime)
  );

  const [staffId, setStaffId] = useState(
    editingReservation?.staffId || ""
  );

  const [selectedTime, setSelectedTime] = useState(
    editingReservation
      ? new Date(editingReservation.startTime).toISOString()
      : ""
  );

  const [guests, setGuests] = useState(
    editingReservation?.guests || 1
  );

  const [notes, setNotes] = useState(
    editingReservation?.notes || ""
  );

  const [customFields, setCustomFields] = useState(
    editingReservation?.customFields || {}
  );

  const [errors, setErrors] = useState([]);

  const service = businessServices.find(
    (item) => item.id === serviceId
  );

  const availableStaff = staff.filter(
    (person) =>
      person.businessId === business.id &&
      person.active &&
      person.serviceIds.includes(serviceId)
  );

  const candidates = service?.requiresStaff ? (staffId === "any" ? availableStaff.map(p => p.id) : staffId ? [staffId] : []) : [null];
  const slots = service ? [...new Map(candidates.flatMap(id => getAvailableSlots({businessId:business.id,staffId:id,date,durationMinutes:service.durationMinutes,reservations,openingHour:business.settings?.openingHour ?? 9,closingHour:business.settings?.closingHour ?? 22,excludeReservationId:editingReservation?.id}).map(slot=>({...slot,staffId:id}))).map(slot=>[slot.startTime,slot])).values()].sort((a,b)=>a.startTime.localeCompare(b.startTime)) : [];

  function updateCustomField(id, value) {
    setCustomFields((previous) => ({
      ...previous,
      [id]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const slot = slots.find(
      (item) => item.startTime === selectedTime
    );

    if (!slot) {
      setErrors(["Изберете свободен час."]);
      return;
    }

    const reservation = {
      id: editingReservation?.id || crypto.randomUUID(),
      businessId: business.id,
      customerId,
      serviceId,
      staffId: slot.staffId,
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: business.settings?.requiresApproval
        ? "pending"
        : "confirmed",
      guests: bookingFields.some(
        (field) => field.id === "guests"
      ) ? Number(guests) : null,
      customFields,
      notes,
      createdAt:
        editingReservation?.createdAt ||
        new Date().toISOString()
    };

    const result = validateReservation({
      reservation,
      business,
      service,
      reservations,
      bookingFields,
      staff,
      excludeReservationId: editingReservation?.id
    });

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    onSave(reservation);
  }

  return (
    <section className="booking-panel">
      <div className="booking-heading">
        <div>
          <h2>
            {editingReservation
              ? "Редактиране на резервация"
              : "Нова резервация"}
          </h2>
          <p>{business.name}</p>
        </div>

        <button
          type="button"
          className="booking-close"
          onClick={onClose}
          aria-label="Затвори"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Услуга
          <select
            value={serviceId}
            required
            onChange={(event) => {
              setServiceId(event.target.value);
              setStaffId("");
              setSelectedTime("");
            }}
          >
            <option value="">Изберете услуга</option>

            {businessServices.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.durationMinutes} мин.)
              </option>
            ))}
          </select>
        </label>

        {service?.requiresStaff && (
          <label>
            Служител
            <select
              value={staffId}
              required
              onChange={(event) => {
                setStaffId(event.target.value);
                setSelectedTime("");
              }}
            >
              <option value="">Изберете служител</option>

              <option value="any">Без предпочитание</option>
              {availableStaff.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </label>
        )}

        <label>
          Дата
          <input
            type="date"
            min={localDate()}
            value={date}
            required
            onChange={(event) => {
              setDate(event.target.value);
              setSelectedTime("");
            }}
          />
        </label>

        <h3>Свободни часове</h3>

        {slots.length === 0 ? (
          <p className="booking-empty">
            {service?.requiresStaff && !staffId ? "Първо изберете служител или Без предпочитание." : "Няма свободни часове. Изберете друга дата или служител."}
          </p>
        ) : (
          <div className="booking-slots">
            {slots.map((slot) => (
              <button
                key={slot.startTime}
                type="button"
                className={
                  selectedTime === slot.startTime
                    ? "booking-slot selected"
                    : "booking-slot"
                }
                aria-pressed={selectedTime === slot.startTime}
                onClick={() =>
                  setSelectedTime(slot.startTime)
                }
              >
                {formatTime(slot.startTime)}
              </button>
            ))}
          </div>
        )}

        {bookingFields.map((field) => {
          if (field.type === "staff") return null;

          if (field.id === "guests") {
            return (
              <label key={field.id}>
                Брой гости
                <input
                  type="number"
                  min={field.min ?? 1}
                  max={field.max}
                  required={field.required}
                  value={guests}
                  onChange={(event) =>
                    setGuests(event.target.value)
                  }
                />
              </label>
            );
          }

          return (
            <label key={field.id}>
              {field.label}

              {field.type === "select" ? (
                <select
                  required={field.required}
                  value={customFields[field.id] ?? ""}
                  onChange={(event) =>
                    updateCustomField(
                      field.id,
                      event.target.value
                    )
                  }
                >
                  <option value="">Изберете</option>

                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={
                    field.type === "number"
                      ? "number"
                      : "text"
                  }
                  min={field.min}
                  max={field.max}
                  required={field.required}
                  value={customFields[field.id] ?? ""}
                  onChange={(event) =>
                    updateCustomField(
                      field.id,
                      event.target.value
                    )
                  }
                />
              )}
            </label>
          );
        })}

        <label>
          Допълнителни бележки
          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(event.target.value)
            }
            placeholder="Допълнителни изисквания..."
          />
        </label>

        {errors.length > 0 && (
          <div className="booking-errors" role="alert">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <button
          className="booking-submit"
          type="submit"
          disabled={!selectedTime}
        >
          {editingReservation
            ? "Запази промените"
            : "Потвърди резервацията"}
        </button>
      </form>
    </section>
  );
}
