
export const businessTemplates = {
  restaurant: {
    label: "Ресторант",
    bookingMode: "table",
    defaultDurationMinutes: 120,
    requiresStaff: false,

    bookingFields: [
      {
        id: "guests",
        label: "Брой гости",
        type: "number",
        required: true,
        min: 1
      },
      {
        id: "seating",
        label: "Предпочитано място",
        type: "select",
        required: false,
        options: [
          "На закрито",
          "На открито",
          "Без предпочитание"
        ]
      }
    ]
  },

  salon: {
    label: "Салон за красота",
    bookingMode: "appointment",
    defaultDurationMinutes: 60,
    requiresStaff: true,

    bookingFields: [
      {
        id: "preferredStaff",
        label: "Предпочитан служител",
        type: "staff",
        required: false
      }
    ]
  },

  custom: {
    label: "Друг бизнес",
    bookingMode: "appointment",
    defaultDurationMinutes: 60,
    requiresStaff: false,

    bookingFields: []
  }
};
