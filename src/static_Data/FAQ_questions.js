const questions = [
    {
        category: 'Booking Process',
        items: [
            {
                question: 'How do I make a reservation?',
                answer: 'To make a reservation, you can visit our website and follow these steps:\n' +
                    '1. Enter your desired destination, check-in, and check-out dates.\n' +
                    '2. Select the number of rooms and guests.\n' +
                    '3. Browse through the available hotel options and choose the one that suits your preferences.\n' +
                    // '4. Provide your personal details, including name, contact information, and payment information.\n' +
                    '4. only if you are registerd user , then only allowed to make booking , with redirected to payment page.\n' +
                    '5. Review your reservation details and confirm your booking.\n',
                // 'Once your reservation is confirmed, you will receive a confirmation email with the details of your booking.',
            },
            {
                question: 'Can I modify my booking after it\'s made?',
                answer: 'Yes, you can modify your booking after it\'s made, subject to availability and the hotel\'s cancellation policy. ' +
                    'To modify your booking, please contact our customer support team or visit the "My Bookings " section on our website. ' +
                    'Please note that modifications may be subject to additional charges or fees.',
            },
            {
                question: 'Is there a minimum age requirement for booking a hotel room?',
                answer: 'Yes, there is a minimum age requirement for booking a hotel room. The specific age requirement may vary depending on the hotel\'s policy, ' +
                    'but generally, you must be at least 18 years old to book a hotel room. Some hotels may require guests to be 21 years or older. ' +
                    'It\'s advisable to check the hotel\'s terms and conditions or contact them directly for more information.',
            },
        ],
    },
    {
        category: 'Payment and Cancellation',
        items: [
            {
                question: 'What payment methods are accepted?',
                answer: 'We accept various payment methods, including credit cards (Visa, Mastercard, American Express), ' +
                    'debit cards, and online payment platforms such as PayPal. The accepted payment methods may vary depending on the hotel and the booking platform.',
            },
            {
                question: 'What is the cancellation policy?',
                answer: 'Our cancellation policy is designed to provide flexibility to our guests while considering the hotel\'s operational needs. ' +
                    'The specific cancellation policy may vary depending on the hotel and the rate plan you have selected. Generally, we offer both ' +
                    'refundable and non-refundable booking options. Refundable bookings typically allow free cancellation within a specified ' +
                    'period before the check-in date, while non-refundable bookings are not eligible for a refund. It\'s important to review ' +
                    'the terms and conditions of your booking or contact our customer support team for detailed information about the cancellation policy.',
            },
            {
                question: 'Is a deposit required to secure a reservation?',
                answer: 'Yes, a deposit is often required to secure your reservation. The deposit amount and the payment process may vary depending on the hotel and the rate plan you have selected. ' +
                    'Typically, the deposit is charged at the time of booking or upon check-in and is refundable, minus any applicable fees, ' +
                    'if you adhere to the cancellation policy. The specific deposit requirements and policies will be outlined in the booking confirmation or the hotel\'s terms and conditions.',
            },
        ],
    },
    {
        category: 'Hotel Facilities and Amenities',
        items: [
            {
                question: 'What facilities are available at the hotels?',
                answer: 'Our Registered hotels offers a wide range of facilities to enhance your stay. Some of the facilities available include:\n' +
                    '- Swimming pool\n' +
                    '- Fitness center\n' +
                    '- Spa and wellness center\n' +
                    '- Restaurant and bar\n' +
                    '- Business center\n' +
                    '- Concierge services\n' +
                    '- Room service\n' +
                    'Please note that the availability of specific facilities may vary depending on the hotel\'s location and category.',
            },
            {
                question: 'Is Wi-Fi available in the rooms?',
                answer: 'Yes,mostly complimentary Wi-Fi is available in all rooms and public areas of our hotels. ' +
                    'You can easily connect to the Wi-Fi network using the provided credentials upon check-in. This may vary with different hotels ' +
                    'If you encounter any issues with the Wi-Fi connection, please contact the front desk for assistance at the hotel.',
            },
            {
                question: 'Are pets allowed in the hotel?',
                answer: 'Unfortunately, pets are not allowed in our hotel. We understand that pets are an important part of your family, ' +
                    'but to ensure the comfort and safety of all our guests, we have a no-pets policy in place. ' +
                    'We can recommend nearby pet-friendly accommodations if needed.',
            },
        ],
    },
];
export default questions;
