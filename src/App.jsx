
import { useState } from "react";

import BusinessDirectory from "./components/business/BusinessDirectory";
import ReservationList from "./components/booking/ReservationList";

import {
  businesses,
  reservations as initialReservations,
  users,
  services
} from "./data/mockData";

import "./App.css";

function App() {
  const [reservations, setReservations] = useState(
    initialReservations
  );

  function handleSelectBusiness(businessId) {
    const business = businesses.find(
      (b) => b.id === businessId
    );

    alert(`Избран бизнес: ${business?.name}`);
  }

  function handleCancel(reservationId) {
    if (!window.confirm("Да отменим ли резервацията?")) {
      return;
    }

    setReservations((previous) =>
      previous.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, status: "cancelled" }
          : reservation
      )
    );
  }

  function handleEdit(reservationId) {
    alert(`Редактиране: ${reservationId}`);
  }

  return (
    <>
      <header className="app-header">
        <h1>AnyReservation</h1>
        <p>Универсална платформа за резервации</p>
      </header>

      <main>
        <BusinessDirectory
          businesses={businesses}
          onSelectBusiness={handleSelectBusiness}
        />

        <ReservationList
          reservations={reservations}
          users={users}
          services={services}
          onCancel={handleCancel}
          onEdit={handleEdit}
        />
      </main>
    </>
  );
}

export default App;
