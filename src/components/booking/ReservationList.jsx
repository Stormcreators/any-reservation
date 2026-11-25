import "./ReservationList.css";

const statusLabels = {
  pending: "Чакаща потвърждение",
  confirmed: "Потвърдена",
  completed: "Завършена",
  cancelled: "Отказана",
  rejected: "Отхвърлена"
};

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString("bg-BG", {
    timeZone: "Europe/Sofia"
  });
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("bg-BG", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Sofia"
  });
}

function ReservationList({
  reservations = [],
  users = [],
  services = [],
  onCancel,
  onEdit, businesses = [], onApprove, onReject
}) {
  function getCustomerName(customerId) {
    const customer = users.find((u) => u.id === customerId);
    return customer?.name || "Неизвестен клиент";
  }

  function getServiceName(serviceId) {
    const service = services.find((s) => s.id === serviceId);
    return service?.name || "Неизвестна услуга";
  }

  return (
    <section className="reservation-list">
      <h2>Списък с резервации</h2>

      {reservations.length === 0 ? (
        <div className="reservation-empty">
          <p>Все още няма направени резервации.</p>
        </div>
      ) : (
        reservations.map((reservation) => {
          const isActive =
            reservation.status === "pending" ||
            reservation.status === "confirmed";

          return (
            <article
              key={reservation.id}
              className="reservation-card"
            >
              <div className="reservation-info">
                <h3>
                  {businesses.find(b=>b.id===reservation.businessId)?.name || "Бизнес"} · {getCustomerName(reservation.customerId)}
                </h3>

                <p>
                  <strong>Услуга:</strong>{" "}
                  {getServiceName(reservation.serviceId)}
                </p>

                <p>
                  <strong>Начало:</strong>{" "}
                  {formatDate(reservation.startTime)} |{" "}
                  {formatTime(reservation.startTime)}
                </p>

                <p>
                  <strong>Край:</strong>{" "}
                  {formatDate(reservation.endTime)} |{" "}
                  {formatTime(reservation.endTime)}
                </p>

                {reservation.guests != null && (
                  <p>
                    <strong>Брой гости:</strong>{" "}
                    {reservation.guests}
                  </p>
                )}

                {Object.entries(reservation.customFields || {}).map(([key,value]) => <p key={key}><strong>{businesses.find(b=>b.id===reservation.businessId)?.bookingFields?.find(f=>f.id===key)?.label || (key==="seating"?"Място":key==="vehicle"?"Автомобил":key)}:</strong> {value}</p>)}
                {reservation.notes && (
                  <p>
                    <strong>Бележки:</strong>{" "}
                    {reservation.notes}
                  </p>
                )}

                <span
                  className={`reservation-status status-${reservation.status}`}
                >
                  {statusLabels[reservation.status] ||
                    reservation.status}
                </span>
              </div>

              {isActive && (
                <div className="reservation-actions">
                  {reservation.status === "pending" && onApprove && <button className="reservation-edit" onClick={()=>onApprove(reservation.id)}>Потвърди</button>}
                  {reservation.status === "pending" && onReject && <button className="reservation-cancel" onClick={()=>onReject(reservation.id)}>Отхвърли</button>}
                  {onEdit && (
                    <button
                      type="button"
                      className="reservation-edit"
                      onClick={() => onEdit(reservation.id)}
                    >
                      Редактирай
                    </button>
                  )}

                  {onCancel && (
                    <button
                      type="button"
                      className="reservation-cancel"
                      onClick={() => onCancel(reservation.id)}
                    >
                      Откажи
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })
      )}
    </section>
  );
}

export default ReservationList;
