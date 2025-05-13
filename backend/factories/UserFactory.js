import faker from "faker";
import bcrypt from "bcryptjs";

const UserFactory = {
  create: async (overrides = {}) => {
    const defaultUser = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: await bcrypt.hash("password123", 10),
      photo: faker.image.avatar(),
      role: "user",
    };
    return { ...defaultUser, ...overrides };
  },
};

export default UserFactory;
