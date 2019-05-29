# Github Awards

This repo contains the code for our github awards app. This application consumes the Github API to gather information regarding a Github organization. For this organization it ranks different entities based on certain metrics and displays them in a table. For example, it ranks the contributors that have commited to one or more of the organization's and ranks them based on the amount of commits they have made.

## Relevant Elements and Implementation Details

The app is written using the React framework. In the store framework you can find all the files that define reducers and actions for modifying the state of the app. The application state is divided into two parts: one that handles information regarding the requests made to the API and one that handles information that has to be displayed in the interface, such as the loading state of the requests. The app uses the thunk middleware, which allows for the dispatchment of functions instead of action objects, that in turn can compute several changes on the store instead of just one.

The different react components implemented are found in the components folder. The ```App``` component envelops the ```GithubInput``` and the ```Organization``` components. The former is the component in charge of computing the requests on the API and the latter displays this information. The ```Organization``` component contains the ```Awards``` component, that utilizing the react router can display the different ranks for the implemented metrics. These metrics are:

- Number of commits per user.
- Less time between the first and last commits per repository.
- Number of commits per day hour.

## Running the App

To run the repo you must add a valid github auth token in the `.env` in the `AUTH_TOKEN` env var. 
You should create a personal token for this purpose.

### Dependencies

This project requires `yarn`. To run this project run

```
yarn
```

to install the dependencies and

```
yarn start
```

to mount the server.
