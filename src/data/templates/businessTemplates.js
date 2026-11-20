export const businessTemplates = {
  restaurant: {
    label: "Restaurant",
    bookingMode: "table",
    defaultDurationMinutes: 120,
    requiresStaff: false,

    bookingFields: [
      {
        id: "guests",
        label: "Number of guests",
        type: "number",
        required: true,
        min: 1
      },
      {
        id: "seating",
        label: "Seating preference",
        type: "select",
        required: false,
        options: ["Indoor", "Outdoor", "No preference"]
      }
    ]
  },

  salon: {
    label: "Beauty Salon",
    bookingMode: "appointment",
    defaultDurationMinutes: 60,
    requiresStaff: true,

    bookingFields: [
      {
        id: "preferredStaff",
        label: "Preferred staff member",
        type: "staff",
        required: false
      }
    ]
  },

  custom: {
    label: "Other Business",
    bookingMode: "appointment",
    defaultDurationMinutes: 60,
    requiresStaff: false,

    bookingFields: []
  }
};