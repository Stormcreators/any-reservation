# AnyReservation: Shared Data Contract

**Version:** 0.1  
**Status:** Draft, pending team approval  
**Project:** Universal Reservation Platform

## 1. Purpose

This document defines the shared data structures used by AnyReservation.

All team members must follow these conventions when building React components, mock data, services, and future backend functionality.

## 2. Core Entities

### Business

Represents a registered business.

| Field | Type | Description |
|---|---|---|
| id | string | Unique business identifier |
| ownerId | string | References a User |
| name | string | Business name |
| category | string | Business template category |
| description | string | Business description |
| location | object | City, address, country |
| contact | object | Email and phone |
| services | string[] | Service IDs |
| settings | object | Business booking configuration |

### Service

Represents something customers can book.

| Field | Type | Description |
|---|---|---|
| id | string | Unique service identifier |
| businessId | string | References a Business |
| name | string | Service name |
| description | string | Service description |
| durationMinutes | number | Duration in minutes |
| price | number | Nonnegative price |
| currency | string | Currency code, initially EUR |
| requiresStaff | boolean | Whether staff assignment is required |
| active | boolean | Whether the service is available |

### Reservation

Represents a customer's booking.

| Field | Type | Description |
|---|---|---|
| id | string | Unique reservation identifier |
| businessId | string | References a Business |
| customerId | string | References a User |
| serviceId | string | References a Service |
| staffId | string or null | Optional staff reference |
| startTime | string | ISO 8601 timestamp with timezone |
| endTime | string | ISO 8601 timestamp with timezone |
| status | string | Reservation status |
| guests | number | Temporary restaurant-specific field |
| customFields | object | Answers to configurable booking fields |
| notes | string | Customer notes |
| createdAt | string | Creation timestamp |

Allowed reservation statuses:

- `pending`
- `confirmed`
- `completed`
- `cancelled`
- `rejected`

### User

Represents a customer or business owner.

| Field | Type | Description |
|---|---|---|
| id | string | Unique user identifier |
| name | string | Display name |
| email | string | Email address |
| role | string | `customer` or `business_owner` |
| businessIds | string[] | Businesses associated with the user |

### Staff

Represents an employee associated with a business.

| Field | Type | Description |
|---|---|---|
| id | string | Unique staff identifier |
| businessId | string | References a Business |
| name | string | Employee name |
| serviceIds | string[] | Services the employee can provide |
| active | boolean | Whether the employee is active |

## 3. Business Templates

Templates are defined in:

`src/data/templates/businessTemplates.js`

Initial categories:

- `restaurant`
- `salon`
- `custom`

Each template defines:

- `label`
- `bookingMode`
- `defaultDurationMinutes`
- `requiresStaff`
- `bookingFields`

Booking field definitions may include `id`, `label`, `type`, `required`, `min`, and `options`, depending on field type.

The initial supported field types are `number`, `select`, and `staff`.

Businesses should eventually be able to customize their booking fields without changing the application code.

## 4. Relationships

- A Business belongs to a User through `ownerId`.
- A Service belongs to a Business through `businessId`.
- A Reservation references one Business, one Service, and one customer User.
- A Reservation may reference a Staff member.
- A Staff member belongs to one Business and may provide multiple Services.
- A Business references its available Services through the `services` array.

All references must point to existing records.

## 5. Team Conventions

1. Use JavaScript camelCase for properties.
2. Use consistent string identifiers such as `business_001`.
3. Never change shared field names without updating this document and informing the team.
4. Use ISO 8601 timestamps with explicit timezone offsets for reservation dates.
5. Use `null` for intentionally unassigned optional references.
6. Keep mock data separate from UI components.
7. Never store passwords in mock data.
8. Treat mock data as development examples, not production records.
9. Validate relationships and booking availability before confirming reservations.
10. Coordinate changes to shared models through pull requests.

## 6. Open Design Decisions

The following are not finalized:

- Restaurant tables, capacity, and overlapping booking prevention.
- Staff working hours and availability.
- Business opening hours and exceptions.
- How business owners customize templates.
- Whether guest count moves entirely into `customFields`.
- Whether a business owner can manage multiple businesses.
- Customer and business authentication.
- Database and backend technology.
- Cancellation and reminder delivery rules.

These decisions must be resolved before implementing the corresponding features.

## 7. Current Implementation

Mock data:

`src/data/mockData.js`

Business templates:

`src/data/templates/businessTemplates.js`

**Contract status:** Initial shared schema. Import tests passed, but full relationship validation, booking logic, and automated tests have not yet been implemented.