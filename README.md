# Shutter

Shutter is a photography-focused social media web application that allows users to share visual content and engage with others through likes and comments. The platform encourages creativity and community by enabling users to create posts with images and captions, interact with others’ content, and manage their own personal profiles. 

Shutter is designed to be intuitive, fully responsive, and user-friendly—whether you're a casual viewer or an active contributor. The aim is to provide a clean, simple space for users to explore, express, and connect through shared visual experiences.

![Responsive Mockup](src/assets/responsive.PNG)
 
### Existing Features

- __Navigation Bar (loggedOut)__

  - When the user is not logged in, the navigation bar displays links to sign in, sign up and home page.
  - Navigation remains intuitive and consistent across all devices.

![Nav Bar logged out](src/assets/navbarloggedout.PNG)

- __Navigation Bar (loggedIn)__

  - The navigation bar appears on all pages and includes links to the homepage, create post form, profile, and logout.
  - Fully responsive, with a collapsible menu on smaller screens.
  - Shows the user's avatar and name once logged in on the profiles page for a personalized experience.

![Nav Bar logged in](src/assets/navbarloggedin.PNG)

- __Home Page__

  - Displays all public posts in reverse chronological order.
  - Each post shows an image, title, content preview, like count, and comment count.
  - Users can search posts by title.
  - Infinite scroll for seamless navigation.
  - Unauthenticated users are prompted to log in when attempting to like or comment.

![Home Page](src/assets/homepage.PNG)

- __Create Post Form__

  - Users can create new posts including a title, content, and image.
  - The image preview updates in real-time upon upload.
  - Form validates required fields and redirects to the homepage with updated content after submission.

![Create Post](src/assets/createpost.PNG)

- __Edit Post Form__

  - Users can update existing posts with new content or images.
  - Only the post owner can access the edit form.
  - Form pre-populates with existing post data for easy editing.

![Edit Post](src/assets/editpost.PNG)

- __Profile Page__

  - Displays the logged-in user's profile info and their posts.
  - Allows editing or deleting user posts.
  - Profile image defaults to a generic avatar unless changed by the user.

![Profile Page](src/assets/profilepage.PNG)

- __Edit Profile Page__

  - Authenticated users can edit their name, bio, and profile picture.
  - Input validation ensures a smooth user experience.

![Edit Profile Page](src/assets/editprofile.PNG)

- __Sign In__

  - The sign in page allows the user to login and be able to use the restricted features, liking, commenting and creating posts.

![Sign In](src/assets/signin.PNG)

- __Sign Up__

  - This page allows the user to create an account so they can create posts, like, comment and delete all if needed.

![Sign Up](src/assets/signup.PNG)

## Components

-  __Asset__
- Reused component to show when things like posts were loading, this is good ux because the users can see the page hasn't
frozen and that the posts are loading.

- __NavBar__
- Reused the NavBar across all pages, this is essential because this is how the user navigates throughout the page so it
needs to be smooth, quick and easy to use


## User Stories

- I didn't user a wireframe for this project because I based the design on the website from the moments project, I wanted
a light and simplistic feel so went with blue and used react icons.

- Link to me user stories - https://github.com/users/ZakL1/projects/5?query=sort%3Aupdated-desc+is%3Aopen

## Manual Testing 


-   __Manual Test 1: Creating a Post__
- Goal: Check that a logged-in user can successfully create a new post and see it on the homepage.

- Steps I Took:

- Logged into my test account.

- Clicked on “Create Post” in the navbar.

- Filled in the title, content, and uploaded an image.

- Clicked the “Create Post” button.

- What I Expected: The post would be created and take me back to the homepage where I’d see it listed.

- What Happened: Worked perfectly — the post appeared instantly on the homepage and on my profile.

- Result: Pass


-   __Manual Test 2: Liking a Post__
- Goal: Make sure logged-in users can like and unlike a post.

- Steps I Took:

- Logged in.

- Found a post on the homepage.

- Clicked the heart icon to like it.

- Clicked it again to unlike it.

- What I Expected: The like count would go up and down accordingly.

- What Happened: Everything worked as expected, and I couldn’t like my own posts — which is good!

- Result: Pass

-   __Manual Test 3: Posting a Comment__
- Goal: Test if a user can add a comment to a post and see it show up.

- Steps I Took:

- Logged in.

- Clicked the comment icon under a post.

- Typed a comment and hit submit.

- What I Expected: My comment would appear right away below the form.

- What Happened: The comment popped up immediately and stayed there after refreshing the page.

- Result: Pass

-   __Manual Test 4: Edit Profile__
- Goal: Check if I can update my profile bio and image.

- Steps I Took:

- Logged in and went to my profile page.

- Clicked “Edit Profile”.

- Uploaded a new profile picture.

- Clicked save and went back to my profile.

- What I Expected: The picture would update and be visible immediately.

- What Happened: The new info showed up straight away — no issues.

- Result: Pass


- __Manual Test 5: Deleting a Post__

- Goal: Confirm a user can delete their own post.

- Steps I Took:

- Logged into my test account.

- Navigated to one of my existing posts.

- Clicked the "Delete" button.

- Confirmed the deletion when prompted.

- What I Expected: The post would be permanently deleted and disappear from the homepage and my profile.

- What Happened: The post was removed immediately without errors.

- Result: Pass


- __Manual Test 6: Editing a Post__

- Goal: Ensure I can update the title, content, or image of a post.

- Steps I Took:

- Logged in and viewed one of my posts.

- Clicked "Edit".

- Changed the title and image.

- Clicked save.

- What I Expected: The post would update and reflect my changes.

- What Happened: Changes appeared instantly on both the homepage and profile.

- Result: Pass


- __Manual Test 7: Challenge Filter Toggle__

- Goal: Test the challenge filter toggle to hide "expired" challenges.

- Steps I Took:

- Went to the "Challenges" page.

- Clicked the toggle button to hide expired challenges.

- Watched the challenge list update accordingly.

- What I Expected: Only active or expired challenges would be shown based on the toggle.

- What Happened: Filter worked smoothly and clearly updated the UI.

- Result: Pass


- __Manual Test 8: Linking Post to Challenge__

- Goal: Check that users can assign a challenge to their post.

- Steps I Took:

- Went to “Create Post”.

- Filled in the form and selected a challenge from the dropdown.

- Submitted the post.

- What I Expected: The post would appear under the selected challenge’s “Top Posts” if it received enough likes.

- What Happened: Post was correctly associated and counted for the challenge.

- Result: Pass


- __Manual Test 9: Expired Challenge Disclaimer__

- Goal: Ensure users are informed when a challenge is expired.

- Steps I Took:

- Opened the challenge page for a past challenge.

- Viewed the top posts section.

- What I Expected: A message would appear to indicate that the challenge is no longer active and likes are only counted during valid dates.

- What Happened: Disclaimer showed clearly and looked appropriate.

- Result: Pass


- __Manual Test 10: Redirect When Not Logged In (Create Post)__

- Goal: Ensure users who aren't signed in can't access the "Create Post" page directly via URL.

- Steps I Took:

- Logged out of my account.

- Manually typed /create in the browser’s address bar and hit enter.

- What I Expected: I would be redirected to the sign-in page with a login prompt.

- What Happened: I was incorrectly directed to the Create post form.

- Result: Failed

- What I changed: I added "RequireAuth" to the Create Post link to prevent this from happening
in the future.

- Result: Pass


- __Manual Test 11: Prevent Liking Without Login__

- Goal: Make sure users must be logged in to like a post.

- Steps I Took:

- Logged out.

- Went to the homepage.

- Clicked the heart icon on a post.

- What I Expected: A message would tell me to log in.

- What Happened: I got a warning alert saying I must log in to like the post.

- Result: Pass


## Automatic testing

- Did not have time to implement this

## Not fixed bugs

- the logout feature works but the user has to manually logout, if they close the page and don't logout they will stay logged in
when they re-open the page. I ran out of time to fix this and it is an example of poor safety features.

### Validator Testing 

- CSS
  - No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fvalidator.w3.org%2Fnu%2F%3Fdoc%3Dhttps%253A%252F%252Fcode-institute-org.github.io%252Flove-running-2.0%252Findex.html&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en#css)
- Javascript
  - No errors were found when passing through the official [ESLint validator](https://eslint.org/play/)

### Unfixed Bugs

- Attempted fix but couldn't do it in time - when the user creats a post they are redirected to the postspage, however the user needs to
refresh the page to like and comment on posts

### Future features

- Add followers to profiles 
- Add functionality to edit comments inline
- The ability to go to other users accounts 
- Upload videos with audio
- Remember me button for quick and easy sign in

## Technologies & Libraries 

- React: Core front-end library for building the UI

- React Router DOM:	Handling navigation and routing between pages

- Axios: Sending HTTP requests to the backend API

- React Bootstrap: Styling and layout using Bootstrap components in React

- Bootstrap: Core CSS framework for layout and responsive design

- React Icons: Adding icons (for like, comment, delete, edit)

- classnames: Conditional CSS class handling 

- react-infinite-scroll-component:	Enables infinite scrolling on the post list

- eslint: Code quality and formatting linting 

## Deployment

- The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the GitHub repository, navigate to the Settings tab 
  - From the source section drop-down menu, select the Master Branch
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment. 

1. **Ensure Build Output is Ready**

- Run the following command to create an optimized production build of your app:

  - Run this command in the terminal
  - npm run build
  - This will generate a `build/` folder containing all the necessary static files for deployment.

  - Install gunicorn in your django frontend terminal by typing:
  - pip install gunicorn
  - pip freeze > requiremtns.txt

  - Now create a new file in the root directory called 'Procfile', no extensions
  - Add the follwing code to the file:
  - web: gunicorn your_project_name.wsgi


### 🌐 Deploying to Heroku

1. **Create a New App on Heroku**

   - Create a heroku account (if you don't have one)
   - Go to [Heroku Dashboard](https://dashboard.heroku.com/)
   - Click **"New" > "Create new app"**
   - Enter a name (e.g., `Shutter`)
   - Choose your region and click **Create app**

2. **Connect to GitHub**

   - In your Heroku app, go to the **Deploy** tab
   - Choose **GitHub** as the deployment method
   - Connect your GitHub account if prompted
   - Search for and connect the correct repository

3. **Set the Buildpack for Static Sites**

   - Go to the **Settings** tab in Heroku
   - Under **Buildpacks**, click **Add Buildpack**
   - Select:  node.js
   - Make sure it's listed above any other buildpacks
 

### 🚀 Deploy the App

1. Go to the **Deploy** tab
2. Under **Manual deploy**, select your branch (e.g., `main`)
3. Click **Deploy Branch**

Heroku will fetch your repo, use the static buildpack, and serve the `build/` folder as a static site.

---

The live link can be found here - https://shutter-main-990a60fdcc03.herokuapp.com/


## Credits 

### Content 

- ChatGPT was used for some of the content and debugging help
- The icons are react-icons
- The fonts were taken from [Google fonts](https://fonts.google.com/)
- The Moments project helped to give me an idea on the structure of my website
- A big thank you to the code intitute tutor team for the help!

### Media

- All images are from google images
