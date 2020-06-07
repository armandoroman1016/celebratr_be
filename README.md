# celebratr_be

### API documentation [here](https://party-planner-back-end.herokuapp.com/docs)<br>

#### Application delpoyed on [Heroku](https://party-planner-back-end.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

### ExpressJs

-    Express.js makes development easy by allowing us to create secure, modular, and fast applications. 

-    Express.js is an unopinionated framework, meaning there isn't any strict and determined rules on how to deal with certain requests. We can create our own custom middleware to handle requests in the ways we wish.

- To update the documentation for the API **npm run docs** 

# Data Model
---
#### Users

```
{
  id: STRING
  email: STRING
  first_name:STRING
  last_name:STRING
  password: STRING
  type: STRING
}
```

#### EVENTS

```
{
  id: STRING
  name: STRING
  date: STRING
  start_time:STRING
  end_time:STRING
  budget: INTEGER
  adult_guests: INTEGER
  child_guests: INTEGER
  background_color: STRING
  theme: STRING
  host_id: STRING foreign-key
}
```

#### GUESTS

```
{
  id: STRING
  event_id: STRING foreign-key
  user_id: STRING foreign-key
}
```

#### TO_DO

```
{
  id: STRING
  name: STRING
  notes: STRING
  completed:BOOLEAN
  event_id: STRING foreign-key
}
```

#### VENDORS

```
{
  id: STRING
  cost: INTEGER
  notes: STRING
  purchased: BOOLEAN
  event_id: STRING foreign-key
}
```

#### SHOPPING_ITEM

```
{
  id: STRING
  name: STRING
  event_id: STRING foreign-key
  purchased: BOOLEAN
  cost: INTEGER
  notes: STRING
}
```

---


## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
    
    *  DEV_DB_URL - URL to a PostgreSQL DB for development 
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/armandoroman1016/party_planner_fe) for details on the frontend of our project.
