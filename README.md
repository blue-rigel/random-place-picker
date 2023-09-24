### Technical Stack

- FrontEnd - React JS
- Backend - Next JS API
- DB - SQLite
- ORM - Prisma

# Setup

- Make sure you are running Node 18.x
- Run `npm install` to get all the necessery modules
- From backend folder, run `npm run db:migrate` to deploy table structure
- From backend folder, run `npm run db:seed` to populate sample data

# Description

- Plan => The event for which we need options from users
- Submission => Every plan has its own set of submission
- User can request the system to pick a random submission

# APIs

- /api/plan - GET => Returns list of all plans
- /api/plan - POST => Create new plan
- /api/plan - DELETE => Delete plan and submission
- /api/plan/:planId - GET => Get single plan
- /api/plan/:planId - POST => Add new submission under a plan
- /api/plan/:planId - PUT => Pick new place for a plan
- /api/:planId - GET => Get list of all submission

### Running the project

- Run `npm start` on root folder to start the project
- Visit [Webpage](http://localhost:3000)
