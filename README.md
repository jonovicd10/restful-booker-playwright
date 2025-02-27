# restful-booker API Automated Tests

This project contains automated tests for the restful-booker API using Playwright and TypeScript. The tests cover authentication and CRUD operations.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or above)
- The restful-booker API must be running locally at `http://localhost:3001`.  
  (Check https://github.com/mwinteringham/restful-booker repository for instructions on running it via Docker or another method.)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jonovicd10/restful-booker-playwright.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Playwright browsers (if not already installed):**

   ```bash
   npx playwright install
   ```

## Configuration

- **Configuration Constants:**  
  The API URL and endpoint paths are defined in the `config/config.ts` file. This centralizes all configuration and makes it easier to update values for different environments.

- **Test Data:**  
  All test data—including authentication credentials, booking data (with dynamic timestamps), and expected responses—is defined in the `tests/data/test-data.ts` file.

## Running the Tests

To run all tests:

```bash
npx playwright test
```

To run a specific test file, for example, the CRUD tests:

```bash
npx playwright test tests/crud.spec.ts
```

Or the Authentication tests:

```bash
npx playwright test tests/auth.spec.ts
```

## Test Scenarios Covered

### Authentication Tests (`auth.spec.ts`)
- **Successful Authentication:**  
  Uses valid credentials (from `authCredentials` in `tests/data/test-data.ts`) to verify that the `/auth` endpoint returns an authentication token.
- **Failed Authentication:**  
  Uses invalid credentials to verify that the API returns a response with the reason `"Bad credentials"`.

### CRUD Tests (`crud.spec.ts`)
- **Create Booking:**  
  Creates a new booking using data from `bookingData`. The `firstname` includes a dynamic timestamp to ensure uniqueness. The test verifies that a booking ID is returned and that the response data matches the input.
- **Read Booking:**  
  Reads the booking using the booking ID saved from the create test and verifies that the returned data matches the original booking data.
- **Update Booking:**  
  Updates the existing booking with new values defined in `updatedBookingData` (a separate set of test data). This confirms that the update operation successfully modifies the resource.
- **Delete Booking:**  
  Deletes the booking using the stored booking ID and verifies that subsequent retrieval attempts return a 404 status code, indicating the resource has been removed.

## Assumptions and Limitations

- **API Availability:**  
  The tests assume the Booking API is running at `http://localhost:3001`.
- **Authentication:**  
  A valid token is expected from the `/auth` endpoint using the credentials provided in `tests/data/test-data.ts`.
- **Test Data Management:**  
  Configuration and test data are separated into `config/config.ts` and `tests/data/test-data.ts` respectively, facilitating easy updates and maintenance.
- **Test Independence:**  
  For this assignment, the task specifically required that we use the same booking ID from the create booking test for the read, update, and delete tests. This means our tests depend on each other, as later tests rely on the booking created in the first test. Because of this design, it's important to run the tests sequentially with a single worker to make sure everything happens in the correct order and the booking ID is available for all subsequent operations.
