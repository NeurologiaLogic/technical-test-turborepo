import { db } from "../config/firebaseConfig";
import { User } from "../entities/user"; 
import { hashPassword } from "../lib/crypto";

const plainPassword = "pass123";

const seedUsers = async () => {
  try {
    const hashedPassword = await hashPassword(plainPassword); 

    const dummyUsers: User[] = [
      {
        userId: "user_001",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: hashedPassword, 
        age: 25,
        address: "789 Oak Street, Chicago, IL",
      },
      {
        userId: "user_002",
        name: "Bob Williams",
        email: "bob.williams@example.com",
        password: hashedPassword,
        age: 30,
        address: "456 Pine Road, Dallas, TX",
      },
      {
        userId: "user_003",
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        password: hashedPassword,
        age: 27,
        address: "123 Maple Ave, San Francisco, CA",
      },
      {
        userId: "user_004",
        name: "Diana Ross",
        email: "diana.ross@example.com",
        password: hashedPassword,
        age: 35,
        address: "567 Cedar Lane, Seattle, WA",
      },
    ];

    for (const user of dummyUsers) {
      await db.collection("users").doc(user.userId).set(user);
      console.log(`✅ User added: ${user.name} (${user.email})`);
    }
    console.log("🔥 All users seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding users:", error);
  }
};

seedUsers();
