# WWF - Wander With Food

Restaurant discovery platform with admin dashboard for CRUD operations.

## Tech Stack
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + MongoDB
- **Animations**: GSAP + Framer Motion

## Quick Setup

```bash
npm install
npm run seed    # Seed MongoDB with sample data
npm run api     # Start backend (port 4000)
npm run dev     # Start frontend (port 3000)
```

## Environment Variables
```env
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=wwf
PORT=4000
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## System Features

### Public Pages
- **Home** (`/`) - Landing page with animations
- **Explore** (`/explore`) - Restaurant discovery
- **About** (`/about`) - Company information
- **Blogs** (`/blogs`) - Content management
- **Contact** (`/contact`) - Contact form
- **Feedback** (`/feedback`) - User feedback

### Admin Dashboard (`/dashboard`)
- **Authentication**: Username: `naveen`, Password: `name_sake`
- **CRUD Operations**: Create, Read, Update, Delete restaurants
- **Restaurant Fields**: Name, cuisine, rating, image, district, delivery time, distance, category, price range, emoji, signature dish, featured status
- **API Protection**: Bearer token authentication for all CUD operations

### Backend API (`/api`)
- `GET /restaurants/all` - Fetch all restaurants
- `POST /restaurants` - Create restaurant (auth required)
- `PUT /restaurants/:id` - Update restaurant (auth required)
- `DELETE /restaurants/:id` - Delete restaurant (auth required)
- `GET /explore/*` - Explore page data

## Project Structure
```
├── app/                 # Next.js pages
├── components/          # React components
├── backend/            # Express.js API
├── lib/                # Utility functions
├── types/              # TypeScript definitions
├── ui/                 # shadcn/ui components
└── public/             # Static assets
```

## Database Schema
- **id**: Incremental numeric identifier used by API routes (e.g., `/restaurants/:id`).
- **name**: Restaurant display name.
- **cuisine**: Primary cuisine type (e.g., Indian, Italian).
- **rating**: Number from 0–5 (supports decimals like 4.3).
- **image**: Absolute URL of the cover image shown in cards.
- **district**: City area/region for filtering (e.g., Koramangala).
- **deliveryTime**: Estimated delivery or service time string (e.g., "30–40 mins").
- **distance**: Approximate distance string (e.g., "2.1 km").
- **category**: Grouping tag (e.g., "veg", "family", "casual").
- **priceRange**: Price indicator (e.g., "₹₹" or "Moderate").
- **emoji**: Single emoji used for visual accent (e.g., 🍛).
- **signatureDish**: Highlighted dish name for promotions.
- **featured**: Boolean; if true, shown in featured sections.
- **featuredCategory**: Where to feature: `ambience` or `dishes`.