import User from "../../models/User.js";
import { UserFactory } from "../../factories/index.js";

const UserSeeder = {
  seed: async (count = 10) => {
    const users = [];

    const adminData = await UserFactory.create({
      username: "admin",
      email: "admin@example.com",
      role: "admin",
    });
    const admin = new User(adminData);
    await admin.save();
    users.push(admin);

    // Create regular users
    for (let i = 0; i < count; i++) {
        const userData = await UserFactory.create();
        const user = new User(userData);
        await user.save();
        users.push(user);
      }

      console.log(`${users.length} users seeded`);
    return users;
  },

  truncate: async () => {
    await User.deleteMany({});
    console.log('Users collection cleared');
  }

};

export default UserSeeder;
