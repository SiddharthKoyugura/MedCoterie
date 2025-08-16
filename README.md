# 1. To run:

```
Add "DATABASE_URL" in .env file

npm i

npm run dev

```

<a href="https://med-coterie.vercel.app/">Click Here</a> to view the deployed-app

# 2. Tech Stack Used

```

Frontend- Next.js
Backend - Express + tRPC
Database - PostgreSQL
ORM - Prisma

```

# 3. Features Implemented

<li>
    All the questions will be displayed in order of their creation time.
</li>
<li>
    Users can search for a question using a text field.
</li>
<li>
    Users can click on a particular question to read all the answers or submit their own answer.
</li>
<li>
    Proper data management techniques have been implemented to increase scalability. (For example: only questions are loaded on the first page, and when a user clicks on a particular question, only that question's answers are rendered.)
</li>
<li>
    tRPC has been integrated to ensure seamless type-safe communication between the client and the database.
</li>

# 4. Possible Future Improvements

<li>
    User Authentication & Profiles – Allow users to register, log in, and manage their profile (with history of asked and answered questions).
</li>

<li>
Fuzzy Search & Advanced Filters – Enhance the search feature with fuzzy search, filtering by tags, author, or date range.
</li>

<li>
    Voting System – Introduce upvotes/downvotes for both questions and answers to highlight the most useful content.
</li>

<li>
    Notifications System – Notify users when someone answers their question or comments on it.
</li>

<li>
    Internationalization (i18n) – Support multiple languages for a wider user base.
</li>

<li>
    Upgrade to premium quality UI/UX - Dark Mode & Theme Customization.
</li>
