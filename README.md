# Social App Run through
Run through build of a ts remix social app using Planetscale, Prisma, Tailwind, deployed on Vercel.
Used: https://egghead.io/lessons/remix-install-and-model-data-with-prisma

## Getting setup locally
1. Connect to pscale: `pscale connect remix-social main --port 3309`
2. Load up prisma studio: `npx prisma studio`
3. Run remix dev server: `npm run dev`

## Development flow
1. Get setup
2. fetch latest changes from remote - `git fetch origin`
3. Make dev updates & test locally
   1. for new data models, see pscale notes below
4. Push changes:
   1. `git checkout -b feature/{{feature name e.g. add-h1}}`
   2. `git status // check which branch you're on and where its at`
   3. `git add .` // or:
      1. `git add app/routes/index.tsx`
      2. `git add -A` stages all changes
      3. `git add .` stages new files and modifications, without deletions (on the current directory and its subdirectories).
      4. `git add -u` stages modifications and deletions, without new files
   4. `git commit -m 'commit message'`
   5. push changes: `git push --set-upstream origin feature/update-h1`
      1. can't use `git push` because the remote branch won't exist yet
   6. Access PR via terminal output
   7. Take a screenshot of UI change and add to the PR
   8. Create PR
   9.  Vercel auto-creates a preview deployment to the PR
   10. Show Environemnt > View deployment > Review PR
   11. Add review comments
   12. Merge branch if ready
   13. Delete feature branch
   14. Vercel will start building

**New model creation (or any db changes) process:**
   1. create new branch in pscale: `pscale branch create remix-social {{new model e.g. user}}`
   2. IMPORTANT: make sure there are no open connections to pscale
   3. connect to pscale branch: `pscale connect remix-social user --port 3309`
   4. create git branch: 
      1. make sure all local repo changes have been commited / pushed etc
      2. checkout the master `git checkout main` 
      3. fetch commits from master branch of origin remote and then merge into the branch currently checked out `git pull origin main`
      4. create branch on the latest main - `git checkout -b {{initials eg. rg}}/{{feature eg user}}`
      5. create user model in schema.prisma
      6. push to prisma `npx prisma db push`
         1. **note - must be  a change to schema for a deploy request to be available in pscale**
         2. note that you may receive errors where new models require relationships to existing data - you'll need to work out how to handle e.g. 
            1. set as optional 
            2. push up changes and update relations
            3. update schema.prisma and re-push
      7. redeploy to gh
      8. vercel triggers rebuild
      9. SWITCH branches across all: pscale, pscale connection, git
      10. close connection to pscale dev branch and relauch prod if needed
   5. always branch both db and code - allows to document step by step the changes

## Stack
Written in order of implementation
- remix - create-remix - from scratch
- vercel
- prisma - server side ts node ORM - setup as sqlite pre-Planetscale setup (see below): 
  - prisma makes it super easy to switch providers via schema.prisma
  - `npm i --save-dev prisma`
  - `npx prisma init --datasource-provider sqlite`
  - avoids heavy db software e.g. postgres & mysql
  - later replaced w mysql 
  - Prisma Studio to have UI to manage the db: npx prisma studio
  - install prisma client to retrieve from client side: `npm i @prisma/client`
- tailwind
  - npm i -D tailwindcss postcss autoprefixer concurrently
  - get started with tailwind init utility: `npx tailwindcss init -p`
  - 2 scripts
    - dev needs to watch the fs for any updates whereas build only needs to build once
    - `"dev:css": "tailwindcss -w -i ./styles/app.css -o app/styles/app.css"`,
      - `"dev": "concurrently \"npm run dev:css\" \"remix dev\""`,
      - dev is constantly watching and so both need to run concurrently vs the build
    - `"build:css": "tailwindcss -m -i ./styles/app.css -o app/styles/app.css"`,
      - `"build": "npm run build:css && remix build"`,
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
- Vercel - hosting
  - connect via git and import the app
  - will fail initially because prisma requires a db url to be set
    - fix by going to Dash > Integrations > Planet Scale > Add > Select Project > select Prisma > Env vars will be auto-generated
    - Then, remix-social > Settings > Env vars > check DATABASE_URL is setup. This should match the planetscale > remix-social > connect > Prisma/Node value
    - Likely need to REDEPLOY