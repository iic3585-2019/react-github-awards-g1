export const githubFetch = (url) => fetch(
  url,
  {
    headers: {
      'Authorization': `token ${process.env['AUTH_TOKEN']}`
    }
  }
);
