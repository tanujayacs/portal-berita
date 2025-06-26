# portal-berita

A modern news portal built with React, providing users with the latest news across various categories.

## Features and Functionality

*   **Homepage:** Displays the latest news articles, sorted by date, with a focus on highlighting recent content. Includes a "Latest Hot News" section.
*   **Category Pages:** Dedicated pages for each news category (e.g., Sport), allowing users to browse articles specific to their interests.
*   **Detail Page:** In-depth view of a news article, including the full content, author information, and related articles by the same author.
*   **Search:** Allows users to search for news articles by keyword within the title.
*   **Responsive Design:**  The portal adapts to different screen sizes, providing a consistent experience on desktops and mobile devices.
*   **Navigation:**  A navigation bar provides easy access to categories and search functionality. On mobile, the categories and search are placed inside a modal that appears when clicking the menu button.

## Technology Stack

*   **React:** A JavaScript library for building user interfaces.
*   **React Router DOM:**  For navigation and routing within the application.
*   **TypeScript:** Adds static typing to JavaScript for improved code maintainability.
*   **Lucide React:** For icons (Menu and X).
*   **Tailwind CSS:** A utility-first CSS framework for styling.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js:** (Version 16 or higher recommended) - [https://nodejs.org/](https://nodejs.org/)
*   **npm:** (Usually comes with Node.js) or **yarn:**  [https://yarnpkg.com/](https://yarnpkg.com/)

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/tanujayacs/portal-berita.git
    cd portal-berita
    ```

2.  **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3.  **Environment Configuration:**

    This project currently fetches data from an external API using the `getAllNews` function from the `@/services/api` module.  There is no specific `.env` file configuration detailed in the provided files. Assuming the `getAllNews` function fetches data from an API endpoint, you might need to configure the API endpoint URL if it's not hardcoded. Examine the `src/services/api.ts` file (if it exists, as it's referenced but its contents are not provided) to see how the API is being called and if any environment variables are needed.  If environment variables are needed create a `.env` file at the root of your project.

    Example `.env` (if needed):

    ```
    REACT_APP_API_ENDPOINT=https://your-api-endpoint.com/news
    ```

    Then update the  `src/services/api.ts` to read from `process.env.REACT_APP_API_ENDPOINT`.

4.  **Start the development server:**

    Using npm:

    ```bash
    npm run dev
    ```

    Or using yarn:

    ```bash
    yarn run dev
    ```

    This will typically start the application on `http://localhost:5173` (or another port if 5173 is already in use).  Check the console output for the exact URL.

## Usage Guide

Once the development server is running, you can access the news portal in your browser.

*   **Homepage (`/`):** Displays the latest news articles.
*   **Category Pages (`/kategori/:kategori`):** Navigate to a specific category by clicking on a category button in the Navbar, or by manually entering the URL (e.g., `/kategori/sport`).  For example: `/kategori/sport`
*   **Detail Page (`/berita/:slug`):** Access a detailed view of a news article by clicking on a news card. The `:slug` parameter is a unique identifier for each article.  For example: `/berita/example-news-article-slug`.
*   **Search (`/search?q=your_search_term`):** Use the search bar in the navigation to search for news articles by keywords in the title. The search query is passed as a `q` parameter in the URL. Example: `/search?q=sport`.
*   **Error Handling:** If an article is not found, the application redirects to a "404 - Berita Tidak Ditemukan" page.

## API Documentation

The provided files do not include explicit API documentation. However, the application fetches news data using the `getAllNews` function. Based on the code, it appears the API returns an array of `NewsItem` objects, where each object has the following properties:

```typescript
interface NewsItem {
  id: string;
  user_id: string;
  judul: string;
  penulis: string;
  kategori: string;
  status: string;
  deskripsi: string;
  gambar: string;
  slug: string;
  visitor_count: number | null;
  created_at: string;
  updated_at: string;
}
```

The `gambar` property contains the ID of an image hosted on Google Drive. The application uses this ID to construct a thumbnail URL: `https://drive.google.com/thumbnail?id=${news.gambar}`.

The `deskripsi` property contains the full news content, which is rendered as HTML using `dangerouslySetInnerHTML`.

## Contributing Guidelines

Contributions are welcome!  To contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Test your changes thoroughly.
5.  Submit a pull request.

Please follow these guidelines:

*   Write clear and concise code.
*   Use meaningful variable and function names.
*   Add comments to explain complex logic.
*   Update the documentation as needed.
*   Ensure your code adheres to the existing style guidelines.

## License Information

No license information is specified in the repository. All rights are reserved by the author.

## Contact/Support Information

Feel free to reach out for support or collaboration:

Email: tanujayacs@gmail.com
GitHub: Your GitHub Profile
