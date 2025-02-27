const timestamp = new Date().toISOString();

export const authCredentials = {
    username: 'admin',
    password: 'password123'
  };

export const bookingData = {
    firstname: `Dusan_${timestamp}`,
    lastname: 'Jonovic',
    totalprice: 50,
    depositpaid: true,
    bookingdates: {
        checkin: '2025-02-26',
        checkout: '2025-02-28'
    },
    additionalneeds: 'Breakfast'
  };

  export const updatedBookingData = {
    firstname: `Dusan`,
    lastname: 'Jonovic',
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
        checkin: '2025-02-16',
        checkout: '2025-02-18'
    },
    additionalneeds: 'Lunch'
  };

  