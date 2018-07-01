# Firebase from Google
BaaS - Backend as a Service
Cloud platform for mobile and WebApps, integrated with Google Cloud services (after acquisition).
Its great for Mobile App (both iOS and Android).
Not so good for high scalable SaaS products (big limitations, high costs with scale)

## Firebase Database
NoSQL DB, provides an object with data (like MongoDB)
Stores data as JSON format and syncs to all updates of the data to all clients listening to the data.

**Firebase vs MongoDB:**
Firebase database is a fork of MongoDB.
https://medium.freecodecamp.org/firebase-cloud-functions-the-great-the-meh-and-the-ugly-c4562c6dc65d
https://medium.freecodecamp.org/firebase-the-great-the-meh-and-the-ugly-a07252fbcf15
(meh = not interesting, no enthusiastic)
https://stackoverflow.com/questions/29223835/mongodb-vs-firebase
https://www.mongodb.com/blog/post/why-testim-left-google-firebase
https://www.quora.com/Which-is-better-MongoDB-or-Firebase


**PROS:**
Firebase is great for beginning, makes development much simpler.

Better for small teams and small apps or MVP/Prototypes (much less work compering to own server with MongoDB and Node.js ==> much faster to start app tests with clients, no need of DevOps experience, DB administration etc.)

Great if you don't have experienced back end developer and DevOps.

It provides many functions and services, which are hard to write / config on your own.
    * Build in Authentication with OAuth Social login
    * Data permissions to define access to specific parts of the project to certain users (subtree per customer with restricted access)

Fast to start. You can move to MongoDB when your app will need it with a grow.

Great for real-time data views and updates, for React or Angular (e.g. Chat App = fast sync 2 users).
In MongoDB real-time integration is possible with Socket, but much more harder (but you can use MongoDB for data storage and Firebase only for fast chats / syncs between clients).

Highly scalable cloud (but not good with big DB >50GB, and no for Big Data, Business Intelligence)

Base version for MVP/Prototypes is for FREE

If you don't have expertise to scale up the DB and trouble shoot DB related stuffs . (Firebase is more like SaaS so no need to worry about scalability)

Users can use in offline as well. When the connection is lost, the database uses local cache on the device to store changes and push them when back online.

Firebase hosting comes with free CDN and SSL — all running on the Google Cloud platform

zero-configuration hosting

CLI / Console - for deploying and other duties (but not so powerful like normal server with Node.js + MongoDB )

Firebase Cloud Functions are chipper then AWS or Azure.



**CONS:**
But you don't have full control like with own server.

You can't host datalayer. Building an API is near impossible

Gig costs - You have to pay much more when you grow (thousands of $ monthly)
**But Firebase Cloud is still chipper then AWS or Azure !!!**
    One day you will have to pay for your laziness
    Paying $100 per month for something you can run on a $5 DigitalOcean droplet is something that get you to think twice when dealing with server-less code
    https://crisp.chat/blog/why-you-should-never-use-firebase-realtime-database/


You don't have access to full error logs.

No scheduler (cron) - for sending emails, backups, reporting at 2am (low traffic)

JavaScript Only on Firebase Cloud (but they are going to implement some more languages)

You will spend significant time trying to understand Firebase and it's kinks.

It's also quite easy for a project to become a monolithic thing that goes out of control. MongoDB is a much better choice as far as a back end for a large app goes.

Limited Querying
If you have lot of complex scenarios where aggregation of data is needed (Queries that need SUM/AVERAGE etc.). This is recently achievable using Firebase functions but MongoDB gives you more power with Queries.
Implementing queries with code will force you to download large amounts of data and start processing it in the client, which is not great for performance.

Limited Javascript SDK

Lack of offline persistence when working with Javascript. Once you close the application or tab, your data will be gone.

Modeling data in Firebase is tricky.

Messy coding & architecture - the ability to access your data in a single SDK call from anywhere in the client will force you to write some very bad code where business flow and data manipulation are mixed too often

If your goal is to build a SaaS product where data relations, queries, performance, backups, etc. matter, we determined that this was not the ideal tool

MongoDB will reduce a costs and provides enhanced monitoring and backup services.

Support is not very fast, You will have to contact with them more often wen you grow.

Poor Data Control and Backups when your DB is larger then 50 GB (its impossible to export data by UI, you have to contact support and ask for a zip file). With DB >500 GB its really bad (2,5 days to generate a zip file with backup)

All noSQL DBs are slow when you try to simulate Relations like in SQL. For simple data stored in one document its very fast. But if you try to simulate SQL JOIN it makes multiple queries/loop to DB and its slower then mySQL / PostrgeSQL.

    Dealing with relations with NoSQL is hard, dealing with relations with Firebase is pain in the ass. - Baptiste Jamin
    There’s no way to declare one to many or many to many relationships. In practice this means that you’ll end up duplicating your data all over the place (if user will change a Name you will have to change all duplicates - very hard, inefficient and open for bugs)
    UPDATE: in 10.2017 Firebase added Firestore - database service which helps with Queries. But its still not so powerful as MongoDB and you have to learn it.

No good for Big Data, Business Intelligence (Much easier to use Python with MongoDB)

On Development you need internet to connect to Firebase. You can't use your local version like with MongoDB. It's hard on vacations or for remote work.
    It makes testing much longer - you have to connect online every time.

You can’t just use Docker or Node and start your API.

It's a commercial product. **You can't just change a server**. You will have to change your app to change a service provider. **MongoDB is Open Source = you can switch providers with the same app**.

What if Google will change a pricing policy or close Firebase at all (like Facebook did with Parse!)??? You would be forced to change your app and move to MongoDB and Node hosting.

You have to learn how to use it, but if you switch project / company this knowledge would be useless. **Knowledge about MongoDB and SQL is universal** - you can use it in many companies.

Firebase Cloud use Node.js 6 and starting with 8. On MyDevil I have Node.js 10... (much faster)