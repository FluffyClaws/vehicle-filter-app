# Vehicle Filter App

A web application that allows users to select a vehicle make and model year, then displays the available vehicle models for the chosen make and year. The app interacts with the National Highway Traffic Safety Administration (NHTSA) API to fetch vehicle information.

## Features

- **Select Vehicle Make and Year**: Users can select a car make and model year to view available vehicle models.
- **Dynamic Data Fetching**: Vehicle makes and model data are dynamically fetched from the NHTSA API.
- **Client-Side Rendering with Suspense**: Uses React’s Suspense API to handle loading states and asynchronous data fetching on the client-side.
- **Responsive UI**: The user interface is fully responsive and optimized for mobile and desktop devices.

## Architecture Overview

The application is built with [Next.js](https://nextjs.org/), a React framework for building server-side rendered and statically generated web applications. It follows the following structure:

- **Server-Side Rendering (SSR)**: Data is fetched on the server to pre-render the page with vehicle makes and model names before it's sent to the client.
- **Client-Side Fetching**: Vehicle models are fetched on the client-side using React's `useEffect` to allow for dynamic updates.
- **Environment Variables**: API URLs are stored securely in a `.env.local` file to separate configuration from code.

---

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (Node package manager, comes with Node.js)

## Installation

1. Clone the repository:

   ```bash
   git clone
   cd vehicle-filter-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application locally:

   ```bash
   npm run dev
   ```

   This will start the development server at [http://localhost:3000](http://localhost:3000).

## Usage

1. Open the app in your browser at [http://localhost:3000](http://localhost:3000).
2. Select a **Vehicle Make** from the dropdown.
3. Select a **Model Year** from the list.
4. Click the **Next** button to see the available vehicle models for the selected make and year.

## Technologies Used

- **Next.js** - React framework for SSR, static site generation, and client-side rendering.
- **React** - JavaScript library for building the user interface.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **NHTSA Vehicle API** - Provides information about vehicle makes and models.
