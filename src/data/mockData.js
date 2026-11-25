
export const businesses = [
  {
    id: "business_001",
    ownerId: "user_001",
    name: "Lindo",
    category: "restaurant",
    description: "Уютен ресторант с разнообразно меню.",
    location: {
      city: "Стара Загора",
      address: "Примерна улица 10",
      country: "България"
    },
    contact: {
      email: "example@lindo.test",
      phone: "+359000000001"
    },
    services: ["service_001", "service_002"],
    settings: {
      bookingMode: "table",
      requiresApproval: false,
      cancellationHours: 24
    }
  },
  {
    id: "business_002",
    ownerId: "user_003",
    name: "La Piazza",
    category: "restaurant",
    description: "Италианска кухня, пица и паста.",
    location: {
      city: "София",
      address: "Примерна улица 20",
      country: "България"
    },
    contact: {
      email: "contact@lapiazza.test",
      phone: "+359000000002"
    },
    services: ["service_003", "service_004"],
    settings: {
      bookingMode: "table",
      requiresApproval: true,
      cancellationHours: 12
    }
  },
  {
    id: "business_003",
    ownerId: "user_004",
    name: "Studio Bella",
    category: "salon",
    description: "Фризьорски и козметични услуги.",
    location: {
      city: "Стара Загора",
      address: "Примерна улица 30",
      country: "България"
    },
    contact: {
      email: "contact@bella.test",
      phone: "+359000000003"
    },
    services: ["service_005", "service_006", "service_007"],
    settings: {
      bookingMode: "appointment",
      requiresApproval: false,
      cancellationHours: 24
    }
  },
  {
    id: "business_004",
    ownerId: "user_005",
    name: "Urban Cuts",
    category: "salon",
    description: "Мъжко подстригване и оформяне на брада.",
    location: {
      city: "София",
      address: "Примерна улица 40",
      country: "България"
    },
    contact: {
      email: "contact@urbancuts.test",
      phone: "+359000000004"
    },
    services: ["service_008", "service_009"],
    settings: {
      bookingMode: "appointment",
      requiresApproval: false,
      cancellationHours: 12
    }
  },
  {
    id: "business_005",
    ownerId: "user_006",
    name: "AutoFix",
    category: "custom",
    description: "Автосервиз за диагностика и поддръжка.",
    location: {
      city: "Стара Загора",
      address: "Примерна улица 50",
      country: "България"
    },
    contact: {
      email: "contact@autofix.test",
      phone: "+359000000005"
    },
    services: ["service_010", "service_011"],
    settings: {
      bookingMode: "appointment",
      requiresApproval: true,
      cancellationHours: 24
    }
  },
  {
    id: "business_006",
    ownerId: "user_007",
    name: "Focus Studio",
    category: "custom",
    description: "Професионални фотосесии и портрети.",
    location: {
      city: "Пловдив",
      address: "Примерна улица 60",
      country: "България"
    },
    contact: {
      email: "contact@focus.test",
      phone: "+359000000006"
    },
    services: ["service_012", "service_013"],
    settings: {
      bookingMode: "appointment",
      requiresApproval: true,
      cancellationHours: 48
    }
  }
];

export const services = [
  {
    id: "service_001",
    businessId: "business_001",
    name: "Резервация на маса",
    description: "Стандартна резервация.",
    durationMinutes: 120,
    price: 0,
    currency: "EUR",
    requiresStaff: false,
    active: true
  },
  {
    id: "service_002",
    businessId: "business_001",
    name: "Частно събитие",
    description: "Резервация за специален повод.",
    durationMinutes: 180,
    price: 50,
    currency: "EUR",
    requiresStaff: false,
    active: true
  },
  {
    id: "service_003",
    businessId: "business_002",
    name: "Резервация на маса",
    description: "Стандартна резервация.",
    durationMinutes: 90,
    price: 0,
    currency: "EUR",
    requiresStaff: false,
    active: true
  },
  {
    id: "service_004",
    businessId: "business_002",
    name: "Групова резервация",
    description: "Резервация за група.",
    durationMinutes: 180,
    price: 30,
    currency: "EUR",
    requiresStaff: false,
    active: true
  },
  {
    id: "service_005",
    businessId: "business_003",
    name: "Подстригване",
    description: "Дамско подстригване.",
    durationMinutes: 60,
    price: 25,
    currency: "EUR",
    requiresStaff: true,
    active: true
  },
  {
    id: "service_006",
    businessId: "business_003",
    name: "Боядисване",
    description: "Боядисване на коса.",
    durationMinutes: 120,
    price: 55,
    currency: "EUR",
    requiresStaff: true,
    active: true
  },
  {
    id: "service_007",
    businessId: "business_003",
    name: "Маникюр",
    description: "Професионален маникюр.",
    durationMinutes: 60,
    price: 20,
    currency: "EUR",
    requiresStaff: true,
    active: true
  },
  {
    id: "service_008",
    businessId: "business_004",
    name: "Мъжко подстригване",
    description: "Класическо или модерно подстригване.",
    durationMinutes: 30,
    price: 15,
    currency: "EUR",
    requiresStaff: true,
    active: true
  },
  {
    id: "service_009",
    businessId: "business_004",
    name: "Подстригване и брада",
    description: "Комбинирана услуга.",
    durationMinutes: 60,
    price: 25,
    currency: "EUR",
    requiresStaff: true,
    active: true
  },
  {
    id: "service_010",
    businessId: "business_005",
    name: "Диагностика",
    description: "Компютърна диагностика на автомобил.",
    durationMinutes: 60,
    price: 30,
    currency: "EUR",
    requiresStaff: true,
    active: true
  },
  {
    id: "service_011",
    businessId: "business_005",
    name: "Смяна на масло",
    description: "Смяна на двигателно масло и филтър.",
    durationMinutes: 60,
    price: 40,
    currency: "EUR",
    requiresStaff: true,
    active: true
  },
  {
    id: "service_012",
    businessId: "business_006",
    name: "Портретна фотосесия",
    description: "Индивидуална фотосесия.",
    durationMinutes: 60,
    price: 60,
    currency: "EUR",
    requiresStaff: true,
    active: true
  },
  {
    id: "service_013",
    businessId: "business_006",
    name: "Семейна фотосесия",
    description: "Фотосесия за цялото семейство.",
    durationMinutes: 120,
    price: 100,
    currency: "EUR",
    requiresStaff: true,
    active: true
  }
];

export const users = [
  {
    id: "user_001",
    name: "Иван Петров",
    email: "owner@lindo.test",
    role: "business_owner",
    businessIds: ["business_001"]
  },
  {
    id: "user_002",
    name: "Алекс Георгиев",
    email: "customer@example.test",
    role: "customer",
    businessIds: []
  },
  {
    id: "user_003",
    name: "Мария Иванова",
    email: "owner@lapiazza.test",
    role: "business_owner",
    businessIds: ["business_002"]
  },
  {
    id: "user_004",
    name: "Елена Димитрова",
    email: "owner@bella.test",
    role: "business_owner",
    businessIds: ["business_003"]
  },
  {
    id: "user_005",
    name: "Никола Стоянов",
    email: "owner@urbancuts.test",
    role: "business_owner",
    businessIds: ["business_004"]
  },
  {
    id: "user_006",
    name: "Петър Тодоров",
    email: "owner@autofix.test",
    role: "business_owner",
    businessIds: ["business_005"]
  },
  {
    id: "user_007",
    name: "София Николова",
    email: "owner@focus.test",
    role: "business_owner",
    businessIds: ["business_006"]
  },
  {
    id: "user_008",
    name: "Виктор Иванов",
    email: "victor@example.test",
    role: "customer",
    businessIds: []
  },
  {
    id: "user_009",
    name: "Анна Петрова",
    email: "anna@example.test",
    role: "customer",
    businessIds: []
  }
];

export const staff = [
  {
    id: "staff_001",
    businessId: "business_001",
    name: "Димитър",
    serviceIds: ["service_001", "service_002"],
    active: true
  },
  {
    id: "staff_002",
    businessId: "business_003",
    name: "Елена",
    serviceIds: ["service_005", "service_006"],
    active: true
  },
  {
    id: "staff_003",
    businessId: "business_003",
    name: "Виктория",
    serviceIds: ["service_005", "service_006"],
    active: true
  },
  {
    id: "staff_004",
    businessId: "business_003",
    name: "Мила",
    serviceIds: ["service_007"],
    active: true
  },
  {
    id: "staff_005",
    businessId: "business_004",
    name: "Никола",
    serviceIds: ["service_008", "service_009"],
    active: true
  },
  {
    id: "staff_006",
    businessId: "business_004",
    name: "Мартин",
    serviceIds: ["service_008", "service_009"],
    active: true
  },
  {
    id: "staff_007",
    businessId: "business_005",
    name: "Петър",
    serviceIds: ["service_010", "service_011"],
    active: true
  },
  {
    id: "staff_008",
    businessId: "business_005",
    name: "Георги",
    serviceIds: ["service_011"],
    active: true
  },
  {
    id: "staff_009",
    businessId: "business_006",
    name: "София",
    serviceIds: ["service_012", "service_013"],
    active: true
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
    customFields: { seating: "На закрито" },
    notes: "Маса до прозореца.",
    createdAt: "2026-11-20T19:00:00+02:00"
  },
  {
    id: "reservation_002",
    businessId: "business_002",
    customerId: "user_008",
    serviceId: "service_003",
    staffId: null,
    startTime: "2026-11-26T19:00:00+02:00",
    endTime: "2026-11-26T20:30:00+02:00",
    status: "pending",
    guests: 4,
    customFields: {},
    notes: "",
    createdAt: "2026-11-24T10:00:00+02:00"
  },
  {
    id: "reservation_003",
    businessId: "business_003",
    customerId: "user_009",
    serviceId: "service_005",
    staffId: "staff_002",
    startTime: "2026-11-25T10:00:00+02:00",
    endTime: "2026-11-25T11:00:00+02:00",
    status: "confirmed",
    guests: 1,
    customFields: {},
    notes: "",
    createdAt: "2026-11-23T12:00:00+02:00"
  },
  {
    id: "reservation_004",
    businessId: "business_004",
    customerId: "user_008",
    serviceId: "service_008",
    staffId: "staff_005",
    startTime: "2026-11-23T14:00:00+02:00",
    endTime: "2026-11-23T14:30:00+02:00",
    status: "completed",
    guests: 1,
    customFields: {},
    notes: "",
    createdAt: "2026-11-21T12:00:00+02:00"
  },
  {
    id: "reservation_005",
    businessId: "business_005",
    customerId: "user_002",
    serviceId: "service_010",
    staffId: "staff_007",
    startTime: "2026-11-27T11:00:00+02:00",
    endTime: "2026-11-27T12:00:00+02:00",
    status: "pending",
    guests: 1,
    customFields: {},
    notes: "Проверка на двигателя.",
    createdAt: "2026-11-24T09:00:00+02:00"
  },
  {
    id: "reservation_006",
    businessId: "business_006",
    customerId: "user_009",
    serviceId: "service_012",
    staffId: "staff_009",
    startTime: "2026-11-28T15:00:00+02:00",
    endTime: "2026-11-28T16:00:00+02:00",
    status: "cancelled",
    guests: 1,
    customFields: {},
    notes: "",
    createdAt: "2026-11-22T11:00:00+02:00"
  },
  {
    id: "reservation_007",
    businessId: "business_001",
    customerId: "user_009",
    serviceId: "service_001",
    staffId: null,
    startTime: "2026-11-23T18:00:00+02:00",
    endTime: "2026-11-23T20:00:00+02:00",
    status: "completed",
    guests: 3,
    customFields: {},
    notes: "",
    createdAt: "2026-11-21T10:00:00+02:00"
  },
  {
    id: "reservation_008",
    businessId: "business_001",
    customerId: "user_008",
    serviceId: "service_002",
    staffId: null,
    startTime: "2026-11-28T18:00:00+02:00",
    endTime: "2026-11-28T21:00:00+02:00",
    status: "rejected",
    guests: 12,
    customFields: {},
    notes: "Рожден ден.",
    createdAt: "2026-11-22T10:00:00+02:00"
  }
];
