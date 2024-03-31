# GitHub Issue Blog

This project is built with Next.js and serves as a platform for creating a blog using GitHub Issues. Users can create, edit, and manage blog posts directly through GitHub Issues. Redux is employed for storing user data, while Octokit, GitHub's official client library, is utilized for interacting with user information and GitHub repositories. GraphQL is employed for querying data from the GitHub API. Additionally, the project includes functionalities for creating, updating, and deleting blog posts, all implemented using Octokit.

## Features

- Utilizes GitHub Issues for storing blog posts, enabling creation, editing, and deletion of posts.
- Manages user login status and related information using Redux.
- Interacts with GitHub repositories and fetches user information using Octokit.
- Queries blog post data from the GitHub API using GraphQL.
- Implements publishing, editing, and deletion of blog posts, as well as management of comments and labels.
- Utilizes Next.js app router for navigation and server-side rendering for preloading content, enhancing user experience.

## Tech Stack

- **Next.js**: The foundation framework for the frontend project.
- **Redux**: State management library for managing user login status and related information.
- **Octokit**: GitHub's official JavaScript client library for interacting with GitHub repositories.
- **GraphQL**: Query language used to fetch blog post data from the GitHub API.
- **TailwindCSS**: Styling and layout are achieved using TailwindCSS.

## Installation and Running

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/kaikat0211/Dcard-Intern.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Dcard-Intern
    ```

3. Create a `.env.local` file in the root of the project and add the following environment      variables:

    ```bash
    GITHUB_ID
    GITHUB_SECRET
    NEXTAUTH_URL
    NEXTAUTH_SECRET
    ```

    Remember to replace the placeholder values with your actual GitHub ID, GitHub secret, NextAuth URL, NextAuth secret, and public base URL.

4. Install dependencies:

    ```bash
    npm install
    ```

5. Run the project:

    ```bash
    npm run dev
    ```

## Contribution

If you would like to contribute code or suggest improvements, please follow these steps:

1. Fork the repository to your GitHub account.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Develop your feature or fix.
4. Commit your changes: `git commit -am 'Add new feature'`.
5. Push to your forked branch: `git push origin feature-name`.
6. Submit a Pull Request.

We welcome all forms of contributions, including but not limited to new features, bug fixes, and documentation improvements.

## License

This project is distributed under the [MIT License](LICENSE).
