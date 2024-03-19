# GIF Viewer Web App

This project is a web application developed for PI.EXCHANGE PTY LTD as part of their Frontend Engineering coding challenge. The application allows users to browse trending GIFs from Giphy, search for specific GIFs, and view details of individual GIFs.

## Features

- Display a list of trending GIFs from Giphy.
- Allow users to search for GIFs using keywords.
- View details of each GIF, including username and rating.

## Framework and Tools

The application is built using Angular. The application also utilizes the Giphy API for fetching GIF data.

## Folder Structure

The folder structure follows best practices for Angular projects, ensuring scalability and maintainability. Here's a brief overview:

- **src/app/components:** Contains individual components used throughout the application, such as the GIF list, search bar, and GIF details.
- **src/app/utils:** Houses services responsible for handling common functional and business logic.
- **src/app/models:** Defines TypeScript interfaces for representing GIF and others (if any) data structures.
- **src/app/assets:** Includes static assets such as images or CSS files used in the application.
- **src/environments:** Contains environment-specific configuration files, such as API keys.

## Running the Application

To run the application locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the development server.
5. Open a web browser and navigate to `http://localhost:4200` to view the application.

## Evaluation

I spent approximately around 20 hours on completing the coding test, mostly on the work of learning a new framework - Angular. If given more time, I would focus on refining the user interface, optimizing performance, and adding additional features as outlined above, particularly:
- Adding login-signup parts for personalized data.
- Adding user authentication to allow users to save favorite GIFs.
- Enhancing the search functionality with autocomplete suggestions.
- Improving the UI design to provide a more visually appealing experience.
- Writing unit tests to ensure the reliability of critical components.
- Adding animation in expand-collapse sections,... for more attractive views.
- Adding skeleton for gifs loading.
- Adding local storage for faster output and prevent api timeout/overload.
- Structuring the codebase more for the purpose of easy coding and maintaining.
- ...

## Conclusion

Overall, the GIF Viewer Web App provides a functional and intuitive interface for browsing trending GIFs from Giphy. The codebase is well-structured and easy to maintain, ensuring a seamless development experience for future iterations.
