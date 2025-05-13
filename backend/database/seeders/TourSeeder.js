import Tour from '../../models/Tour.js';
import { TourFactory } from '../../factories/index.js';

const TourSeeder = {
    seed: async (count = 20) => {
        const tours =[]

        for (let i = 0; i < count; i++) {
            const tourData = await TourFactory.create({
              featured: i < 8 // make the first 8 tours featured
            });
        }
    }
}