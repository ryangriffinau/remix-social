# Social App Run through
Run through build of a ts remix social app using Planetscale, Prisma, Tailwind, deployed on Vercel.
Used: https://egghead.io/lessons/remix-install-and-model-data-with-prisma

## Getting setup locally
1. Connect to pscale: `pscale connect remix-social main --port 3309`
2. Load up prisma studio: `npx prisma studio`
3. Run remix dev server: `npm run dev`

## Stack
Written in order of implementation
- remix - create-remix - from scratch
- vercel
- prisma - server side ts node ORM - setup as sqlite pre-Planetscale setup (see below): 
  - prisma makes it super easy to switch providers via schema.prisma
  - npm i --save-dev prisma
  - npx prisma init --datasource-provider sqlite
  - avoids heavy db software e.g. postgres & mysql
  - later replaced w mysql 
  - Prisma Studio to have UI to manage the db: npx prisma studio
  - install prisma client to retrieve from client side: npm i @prisma/client
- tailwind
  - npm i -D tailwindcss postcss autoprefixer concurrently
  - get started with tailwind init utility: npx tailwindcss init -p
  - 2 scripts
    - dev needs to watch the fs for any updates whereas build only needs to build once
    - "dev:css": "tailwindcss -w -i ./styles/app.css -o app/styles/app.css",
      - "dev": "concurrently \"npm run dev:css\" \"remix dev\"",
      - dev is constantly watching and so both need to run concurrently vs the build
    - "build:css": "tailwindcss -m -i ./styles/app.css -o app/styles/app.css",
      - "build": "npm run build:css && remix build",
  - tailwindUI for pre-built - backpocket has access
- Zod - ts validation libary - https://zod.dev/
- Planetscale - MySQL serverless db built for scale - like supabase for MySQL but more oriented at scale. Uses a Git like system to track changes in the db
  - with Prisma installed, it makes it easy to switch between db providers
  - this also switched us from SQLite to MySQL (pscale uses)
  - wire up with prisma: https://planetscale.com/docs/tutorials/prisma-quickstart
    - followed most of the steps here in the course
    - when setup, deploy main branch to prod: https://planetscale.com/docs/tutorials/prisma-quickstart#deploy-development-branch-to-production
    - can actually delete the initial-setup branch after its been deployed
  - dev process very powerful
    - you can setup db/app/schema changes
    - run test data on a new branche
    - then push the branch
    - data on old branch will be cleared but main branch data retained
- 