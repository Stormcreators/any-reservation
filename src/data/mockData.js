export const businesses = [
  {
    id: "business_001",
    ownerId: "user_001",

    name: "Lindo",
    category: "restaurant",

    description: "A cozy restaurant with delicious food.",

    location: {
      city: "Stara Zagora",
      address: "Example Street 10",
      country: "Bulgaria"
    },

    contact: {
      email: "example@lindo.test",
      phone: "+359000000000"
    },

    services: ["service_001"],

    settings: {
      bookingMode: "table",
      requiresApproval: false,
      cancellationHours: 24
    }
  }
];
export const reservations = [
  {
    id: "reservation_001",

    businessId: "business_001",
    customerId: "user_002",
    serviceId: "service_001",
    staffId: null,

    startTime: "2026-11-25T18:00:00+02:00",
    endTime: "2026-11-25T20:00:00+02:00",

    status: "confirmed",

    guests: 2,

    customFields: {},

    notes: "",

    createdAt: "2026-11-20T19:00:00+02:00"
  }
];
export const services = [
  {
    id: "service_001",
    businessId: "business_001",

    name: "Table Reservation",
    description: "Reserve a table at Lindo.",

    durationMinutes: 120,
    price: 0,
    currency: "EUR",

    requiresStaff: false,
    active: true
  }
];
export const users = [
  {
    id: "user_001",
    name: "Lindo Owner",
    email: "owner@lindo.test",
    role: "business_owner",
    businessIds: ["business_001"]
  },
  {
    id: "user_002",
    name: "Example Customer",
    email: "customer@example.test",
    role: "customer",
    businessIds: []
  }
];

export const staff = [
  {
    id: "staff_001",
    businessId: "business_001",

    name: "Example Employee",
    serviceIds: ["service_001"],

    active: true
  }
];