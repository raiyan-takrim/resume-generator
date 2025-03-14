import { db } from "./index";
import { users, resumes } from "./schema";

async function seed() {
    // Insert a new user and get their ID
    const [user] = await db
        .insert(users)
        .values({
            email: "user@example.com",
            name: "John Doe",
            image: "https://example.com/profile.jpg",
        })
        .returning({ id: users.id });

    // Insert a resume using the user's UUID
    await db.insert(resumes).values({
        userId: user.id, // This is the valid UUID
        resumeData: { experience: "3 years in web development" },
    });
}

seed();
