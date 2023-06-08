# Songbrrd
Songbrrd is a site that allows users to rate their favorite music. Watch the videos below to get a general idea of its function. 

### Tech Stack
- Next.JS (encapsulates React.JS) - Full-Stack Framework
- Spotify API - Data Retrieval
- MySQL - Database
- Prisma - ORM (Object Relational Mapper)
- NextAuth.JS - OAuth Framework (Google Sign In)

### Sign In

https://user-images.githubusercontent.com/88443609/226967197-8fc1fe0a-1698-4f1c-9765-4eb78cce2be5.mov


Using NextAuth.JS, the app allows for OAuth configuration with Google account sign in, leaving no need to store usernames and passwords in the database.


### Search for Music

https://user-images.githubusercontent.com/88443609/226970044-ccadc12d-0f46-475d-8111-7b71e63ed737.mov


With the help of the Spotify API, users can search for their favorite tracks, albums, or artists using the search bar.
Clicking on an item will navigate the user to the album view, where users can see album info, a tracklist, navigate to the album on Spotify, and rate the album.


### Rate Your Favorite Music

https://user-images.githubusercontent.com/88443609/226968382-aea53c39-4c9b-4006-9620-be5eee81ce6d.MOV


Rating an album will save it to the user's account, which can be accessed by clicking on the profile picture. In the account view, the user can view all of their previously rated albums.

