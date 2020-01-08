# GuelphCourseReminder
Get into any guelph course as soon as it is open

Sign up [here](https://notifymeguelph.xyz/)

### TODO
- [x] Fix login button
- [x] Fix logout button and home button shouldn't log user out. (Might want to redirect user's to the notify page if they're in session like on the mobile app).
- [x] Notify page dashboard with table of what they're currently searching for
- [x] Remove fake accounts from prod db
- [x] iOS and Safari fixes
- [x] Make app email as well as notify
- [x] More error messages and response messages (e.g. successfully save profile message)
- [x] Move input labels on top and add icons for email and password
- [x] Restart search if application crashes.
- [x] Make button for deleting and editing criteria
- [x] Scheduler usable without login
- [x] Possibly compute client side
- [x] Mongo DB Update course rows instead of delete all
- [x] Fix database bug of not gettings all courses
- [x] Thumbnail is not perfect, grid border messes it up
- [x] Adding courses has bugs for Math1200, Cis1300 and Cis1500
- [x] Lectures that are 50 mins long shows as 1h on the schedule
- [x] Make agenda items clickable
- [x] Remove unneeded small red description on items
- [x] Logo done
- [x] History for notify me main page of previous searches
- [x] Make login the default page instead of sign up

- [ ] Scheduler frontend
- [ ] Save favourite schedules
- [ ] Make agenda modals description
- [ ] The database stores EXAM times in the wrong place

- [ ] Ant alerts
- [ ] Ant modals
- [ ] Ant search

- [ ] Responsive design for all pages
- [ ] Login and signup page write up
- [ ] Creation timestamp and status finished and update timestap to each record in db.
- [ ] Show last check for last time api searched webadvisor
- [ ] Account page in frontend to change password/email/prefs
- [ ] Forgot password feature
- [ ] Mobile UI update
- [ ] Remove debug traces from code
- [ ] Home page
---
### Potential Future Ideas
- [ ] Course roadmap
- [ ] Tutoring connections
- [ ] Textbook marketplace

> classlink.ca is available

### Setup
- Environment variables:

    ClassLink/api/.env must contain:

        GMAIL_USER=<account email>
        GMAIL_PASS=<account password>
    
    ClassLink/auth/.env must contain:
        
        # MongoDB connection
        MONGO_URI = mongodb://mongo:27017/auth
        
        # Mongo connection for courses DB
        MONGO_URI_COURSES = mongodb://mongo:27017/courses

        # Email credentials for forgotten password email reset
        EMAIL_ADDRESS = <email>
        EMAIL_PASSWORD = <password>

        # Secrets for JWT and Express-Session.
        # Secrets should be a random, private string.
        JWT_SECRET = <secret>
        SESSION_SECRET = <secret>

        
    ClassLink/frontend/.env must contain:
        
        REACT_APP_HOST=notifymeguelph.xyz
        REACT_APP_PROTOCOL=https://

- Service Account JSON:

    ClassLink/api/serviceAccount.json must contain the firebase private keys and other info.
