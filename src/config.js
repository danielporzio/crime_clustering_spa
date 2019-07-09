export const Environment = {
  getCurrent: () => {
    const hostname = window.location.hostname;
    switch (hostname) {
    case 'crime-clustering-spa-staging.herokuapp.com':
      return {
        env: 'staging',
        api: {
          dataURL: 'https://crime-clustering-staging.herokuapp.com',
        },
      };
    case 'localhost':
      return {
        env: 'development',
        api: {
          dataURL: 'http://localhost:5000',
        },
      };
    default:
      throw new Error('Unknown environment. Please contact support.');
    }
  },
};
