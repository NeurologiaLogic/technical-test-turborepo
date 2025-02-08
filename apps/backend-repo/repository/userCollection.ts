import { db } from "../config/firebaseConfig.js";
import { User } from "@monorepo/types";

export const updateUser = async (userId: string, data: Partial<User>): Promise<void> => {
  try {
    // Log the data being passed for updates
    console.log("Data being sent to Firestore:", JSON.stringify(data));
    const userDocRef = db.collection("users").doc(userId);
    
    // Check the current data before updating
    const currentDoc = await userDocRef.get();
    console.log("Current document data:", currentDoc.data());

    // Update the user document
    await userDocRef.set(data, { merge: true });
    console.log(`✅ User ${userId} updated successfully.`);

    // Check the updated data
    const updatedDoc = await userDocRef.get();
    console.log("Updated document data:", updatedDoc.data());
  } catch (error) {
    console.error(`❌ Error updating user ${userId}:`, error);
  }
};

// 🔹 Fix: Fetch user by email instead of userId
export const fetchUser = async (userId: string): Promise<User | null> => {
  try {
    const snapshot = await db.collection("users").where("userId", "==", userId).get();
    
    if (snapshot.empty) return null;

    // Firestore returns a collection, so we need to extract the first document
    const userDoc = snapshot.docs[0];
    const data = userDoc.data() as User;

    return data;
  } catch (error) {
    console.error(`❌ Error fetching user ${userId}:`, error);
    return null;
  }
};
