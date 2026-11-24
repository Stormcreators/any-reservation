
import { useState, useEffect, useRef } from "react";

import BusinessDirectory from "./components/business/BusinessDirectory";
import ReservationList from "./components/booking/ReservationList";
import BookingForm from "./components/booking/BookingForm";

import {
  businesses,
  reservations as initialReservations,
  users,
  services,
  staff
} from "./data/mockData";

import "./App.css";

const STORAGE_KEY = "anyreservation-reservations";

function loadReservations() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : null;

    return Array.isArray(parsed)
      ? parsed
      : initialReservations;
  } catch {
    return initialReservations;
  }
}

function App() {
  const [reservations, setReservations] = useState(
    loadReservations
  );

  const [selectedBusinessId, setSelectedBusinessId] =
    useState(null);

  const [editingReservation, setEditingReservation] =
    useState(null);

  const bookingFormRef = useRef(null);

  const customerId = "user_002";

  const selectedBusiness = businesses.find(
    (business) => business.id === selectedBusinessId
  );

  useEffect(() => {
    if (selectedBusinessId) {
      bookingFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [selectedBusinessId, editingReservation]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(reservations)
      );
    } catch (error) {
      console.error("Unable to save reservations:", error);
    }
  }, [reservations]);

  function handleSelectBusiness(businessId) {
    setEditingReservation(null);
    setSelectedBusinessId(businessId);
  }

  function handleClose() {
    setSelectedBusinessId(null);
    setEditingReservation(null);
  }

  function handleSave(reservation) {
    setReservations((previous) => {
      const exists = previous.some(
        (item) => item.id === reservation.id
      );

      if (exists) {
        return previous.map((item) =>
          item.id === reservation.id
            ? reservation
            : item
        );
      }

      return [...previous, reservation];
    });

    handleClose();
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
    const reservation = reservations.find(
      (item) => item.id === reservationId
    );

    if (!reservation) return;

    setEditingReservation(reservation);
    setSelectedBusinessId(reservation.businessId);
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

        {selectedBusiness && (
          <div ref={bookingFormRef}>
            <BookingForm
              key={
                editingReservation?.id ||
                selectedBusiness.id
              }
              business={selectedBusiness}
              services={services}
              staff={staff}
              reservations={reservations}
              customerId={
                editingReservation?.customerId ||
                customerId
              }
              editingReservation={editingReservation}
              onSave={handleSave}
              onClose={handleClose}
            />
          </div>
        )}

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
