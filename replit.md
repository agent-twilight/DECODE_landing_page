# Overview

SkincareAI is a React-based web application that provides evidence-based skincare analysis powered by scientific research and authoritative databases. The application allows users to submit product information for analysis and offers waitlist signup and beta testing application functionality. The platform aims to help users make informed decisions about skincare products by cross-referencing ingredients against peer-reviewed research and regulatory databases like PubChem, CIR, EU CosIng, and ECHA.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: Radix UI primitives with shadcn/ui components for consistent design system
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and API interactions
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod schemas shared between client and server for consistent validation
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

## Data Storage Solutions
- **Database**: PostgreSQL (configured for production) with Neon Database serverless
- **Schema Management**: Drizzle migrations with schema-first approach
- **Development Storage**: In-memory storage implementation for rapid development
- **Session Management**: PostgreSQL session store using connect-pg-simple

## Authentication and Authorization
- **Current Implementation**: Basic user schema prepared but not actively used in current features
- **Session Storage**: PostgreSQL-backed sessions configured
- **Future Expansion**: Authentication system ready for implementation with user/password schema

## API Design
- **Architecture**: RESTful API endpoints under `/api` prefix
- **Endpoints**:
  - `POST /api/waitlist` - Waitlist signup with email validation
  - `POST /api/beta` - Beta testing application with experience requirements
- **Validation**: Server-side validation using shared Zod schemas
- **Error Handling**: Centralized error handling with proper HTTP status codes

# External Dependencies

## UI and Component Libraries
- **Radix UI**: Comprehensive set of low-level UI primitives for accessibility and customization
- **Lucide React**: Modern icon library for consistent iconography
- **Class Variance Authority**: Type-safe variant API for component styling
- **Embla Carousel**: Touch-friendly carousel component

## Development and Build Tools
- **Vite**: Fast build tool with HMR and development server
- **Replit Plugins**: Development environment integration with error overlay and cartographer
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer
- **ESBuild**: Fast JavaScript bundler for production builds

## Database and Data Management
- **Neon Database**: Serverless PostgreSQL platform for production database hosting
- **Drizzle Kit**: Migration management and database introspection tools
- **PostgreSQL**: Relational database with UUID support and timestamp management

## Validation and Type Safety
- **Zod**: Runtime validation library with TypeScript integration
- **Drizzle-Zod**: Integration between Drizzle ORM and Zod validation
- **TypeScript**: Static type checking across the entire application stack

## Styling and Design
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Google Fonts**: Web font integration with Inter, DM Sans, Architects Daughter, and Geist Mono
- **Custom CSS Variables**: Consistent theming system with design tokens for colors and spacing