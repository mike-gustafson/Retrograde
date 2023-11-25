# Project 2 Planning

## Part 1

Review the Project 2 requirements and check out some [examples](https://romebell.gitbook.io/sei-802/projects/past-projects/project2).

In this space below, list **THREE** ideas for your Project 2. For each idea, include [user stories](https://www.atlassian.com/agile/project-management/user-stories) for each idea and a link to the API(s) you want to use for it.

--------------------------------------------------------
1. Billy wants to be able to track all the games he owns so he doesn't buy duplicates
    * data: User ID, Users games, Users games copies
    * method: display a sortable and searchable list of games marked "owned" by user
    * notes: user games should allow duplicate entries for duplicate copies, user-game-copies will be done by counting repeate entries, not tracked in the db.  This may not be massively scalable, but that shouldn't be a problem.
2. Rachel wants to add a rating to her games so she can remember which ones are better
    * data: User ID, User games, User game ratings
    * method: display a sortable and searchable list of games marked "owned" by user with ability to rate games
    * notes: top rated games should appear on user profile.
3. Samir wants to see what games he's missing for a complete collection
    * data: ID of game owned, All games w/ matching console ID, Desired platforms
    * method: display a list of desired platforms propagated w/ games that aren't on user owned list
    * notes: owned platforms should appear as badges of some sort on user profile
4. Kim wants to rank how desireable unowned games are and view only the top ones
    * data: User ID, User wishlist, User Desired List
    * method: display a list of all games on user "wishlist".  User can change order to reflect desireablility of titles
    * notes: ranked wishlist should be sharable or displayed publicly
---------------------------------------------------------

Make a PR when you're done!

---

## Part 2

In the space below:
* either embed or link a completed ERD for your approved P2 idea
* if there are any changes/additions to your user stories, place your full set of revised user stories here
* either embed or link wireframes for every page of your app

----------------------------------------------------------
### ERD
![Alt text](<retrograde - erd.jpeg>)
----------------------------------------------------------
### User Stories
1. Billy wants to be able to track all the games he owns so he doesn't buy duplicates
    * data: User ID, Users games, Users games copies
    * method: display a sortable and searchable list of games marked "owned" by user
    * notes: user games should allow duplicate entries for duplicate copies, user-game-copies will be done by counting repeate entries, not tracked in the db.  This may not be massively scalable, but that shouldn't be a problem.
2. Rachel wants to add a rating to her games so she can remember which ones are better
    * data: User ID, User games, User game ratings
    * method: display a sortable and searchable list of games marked "owned" by user with ability to rate games
    * notes: top rated games should appear on user profile.
3. Samir wants to see what games he's missing for a complete collection
    * data: ID of game owned, All games w/ matching console ID, Desired platforms
    * method: display a list of desired platforms propagated w/ games that aren't on user owned list
    * notes: owned platforms should appear as badges of some sort on user profile
4. Kim wants to rank how desireable unowned games are and view only the top ones
    * data: User ID, User wishlist, User Desired List
    * method: display a list of all games on user "wishlist".  User can change order to reflect desireablility of titles
    * notes: ranked wishlist should be sharable or displayed publicly
----------------------------------------------------------
### Wireframes
![Alt text](<VD5UMfz5XLXr (2).png>)
----------------------------------------------------------

Make a PR when you're done!

## Requirements Inside `Project Board`

`card` FUNDAMENTALS
```
### FUNDAMENTALS
- [ ] Deployed (e.g. Heroku)
- [ ] Site has basic functionality related to its goal
- [ ] At least 2 GET routes (other than auth)
- [ ] At least 1 POST route
- [ ] At least 1 DELETE route
- [ ] At least 1 PUT route
```

`card` SUFFICIENT DIFFICULTY
```
### SUFFICIENT DIFFICULTY: At least 1 of the following: 
- [ ] Use of an API
- [ ] Advanced Database Relationships
- [ ] Sockets
- [ ] Scraping
- [ ] OAuth
- [ ] Other
```

`card` AUTH/SECURITY
```
### AUTH/SECURITY (Mostly From Template Boilerplate)
- [ ] Log in works (required: boilerplate or better)
- [ ] Sensible error messages for bad login info  (boilerplate or better)
- [ ] Passwords hashed in database
- [ ] Passwords in form are input type="password" (dots)
- [ ] Password verification is checked
- [ ] Can't sneak edit/delete data that I don't own by typing in random ids
```
`card` GITHUB USAGE
```
### GITHUB USAGE
- [ ] Appropriate Use of Github
- [ ] `README` is included and is descriptive
- [ ] `.gitignore` properly set up
- [ ] No API keys in Github code (used a .env file)
- [ ] Multiple commits per day
- [ ] Repo up on day 1 of project week or sooner
- [ ] `README` has *Installation Instructions*
```

`card` DATABASE USAGE
```
### DATABASE USAGE
- [ ] At least 2 Models other than join tables (required)
- [ ] Relationships were set up appropriately between models
- [ ] Avoided global variables, storing data in files, etc
- [ ] No raw file/image data stored in database, etc
```

`card` CODE STYLE
```
### CODE STYLE
- [ ] Generally DRY code / No enormous files
- [ ] Proper indentation (or mostly pretty good!)
- [ ] Naming conventions kept
- [ ] No glaring logic errors
```
`card` USER EXPERIENCE
```
### USER EXPERIENCE
- [ ] Effort was put into design
- [ ] No broken links (server errors or 404s)
- [ ] Typing a purposely bad link renders an error ejs page
- [ ] Content is responsive to screen size changes
- [ ] No glaring alignment or grid errors
```
