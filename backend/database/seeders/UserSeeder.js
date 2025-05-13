import User from '../../models/User.js';
import { UserFactory } from '../../factories/index.js';

const UserSeeder = {
    seed: async (count = 10) => {
        const users = [];

        const adminData = await UserFactory.create({ 
            username: 'admin',
            email: 'admin@example.com',
            role: 'admin' 
          });

    }
}