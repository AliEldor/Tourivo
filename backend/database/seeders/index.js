import UserSeeder from './UserSeeder.js';
import TourSeeder from './TourSeeder.js';
import ReviewSeeder from './ReviewSeeder.js';
import BookingSeeder from './BookingSeeder.js';

const DatabaseSeeder = {
    seedAll: async () => {
        console.log('Starting database seeding...');
    
    // Clear all collections
    await UserSeeder.truncate();
    await TourSeeder.truncate();
    await ReviewSeeder.truncate();
    await BookingSeeder.truncate();
    }
}