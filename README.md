# Sarbon Cargo Dispatcher

Frontend test task for redesigning dispatcher cargo list page.

## Tech stack

- Next.js
- React
- TypeScript
- React Query
- Axios
- Tailwind CSS
- shadcn/ui

## Features

- Cargo list page
- API integration with required headers
- Pagination
- Limit selector: 10 / 20 / 50
- Search filter
- Loading skeleton
- Error state
- Empty state
- Responsive design
- UZ / RU / EN language switcher

## API note

in case of the provided API token returns `401 Unauthorized`, for demo stability, the app includes a mock-data fallback while keeping the real API integration and required headers.

## Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_CLIENT_TOKEN=client_token_here
NEXT_PUBLIC_USER_TOKEN=user_toekn_here
```

## Getting started

```bash
npm install
npm run dev
```
