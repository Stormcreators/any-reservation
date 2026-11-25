import { useMemo } from "react";
import "./DashboardStats.css";

export default function DashboardStats({ reservations = [] }) {

  const stats = useMemo(() => {
    return {
      total: reservations.length,

      confirmed: reservations.filter(
        (reservation) => reservation.status === "confirmed"
      ).length,

      pending: reservations.filter(
        (reservation) => reservation.status === "pending"
      ).length,

      completed: reservations.filter(
        (reservation) => reservation.status === "completed"
      ).length,

      cancelled: reservations.filter(
        (reservation) =>
          reservation.status === "cancelled" ||
          reservation.status === "rejected"
      ).length,
    };
  }, [reservations]);

  const cards = [
    {
      title: "Общо резервации",
      value: stats.total,
      description: "Всички регистрирани резервации",
      color: "blue",
      icon: "📊",
    },
    {
      title: "Потвърдени",
      value: stats.confirmed,
      description: "Успешно потвърдени резервации",
      color: "green",
      icon: "✓",
    },
    {
      title: "Чакащи",
      value: stats.pending,
      description: "Очакват потвърждение",
      color: "orange",
      icon: "◷",
    },
    {
      title: "Завършени",
      value: stats.completed,
      description: "Успешно приключили резервации",
      color: "purple",
      icon: "★",
    },
    {
      title: "Отказани / Отхвърлени",
      value: stats.cancelled,
      description: "Отменени или отхвърлени резервации",
      color: "red",
      icon: "✕",
    },
  ];

  return (
    <section className="dashboard-stats">

      <div className="dashboard-header">
        <div>
          <h2>Статистика на резервациите</h2>
          <p>Общ преглед на резервациите на вашия бизнес</p>
        </div>
      </div>

      <p>Дял на потвърдените резервации: <strong>{stats.total ? Math.round(stats.confirmed / stats.total * 100) : 0}%</strong></p><div className="stats-grid">

        {cards.map((card, index) => (
          <div
            className={`stat-card ${card.color}`}
            key={index}
          >

            <div className="stat-card-top">
              <span className="stat-title">
                {card.title}
              </span>

              <span className="stat-icon">
                {card.icon}
              </span>
            </div>

            <div className="stat-value">
              {card.value}
            </div>

            <p className="stat-description">
              {card.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}
