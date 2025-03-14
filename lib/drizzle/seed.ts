import { db } from './db';
import { users, resumes } from './schema';
import { eq } from "drizzle-orm";

const seed = async () => {
    // Insert a user
    await db.insert(users).values({
        email: 'test@example.com',
    });

    // Retrieve the user by email
    const user = await db.select().from(users).where(eq(users.email, 'test@example.com')).limit(1);

    if (user.length > 0) {
        // Insert a resume associated with the user
        await db.insert(resumes).values({
            userId: user[0].id,
            fullName: 'John Doe',
            email: 'test@example.com',
            resumeData: { skills: ['Next.js', 'Drizzle', 'Vercel'] },
        });

        console.log('Seeding done!');
    } else {
        console.error('User not found!');
    }
};

seed();
