import { db } from "./index";
import { users } from "./schema";

(async () => {
    await db.insert(users).values({
        name: "Admin",
        email: "admin@example.com",
        image: "https://example.com/avatar.png",
    });
})();
