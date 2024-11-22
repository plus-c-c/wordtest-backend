#!/bin/bash
npx prisma migrate dev --name init
tsx ./test/build.ts
npm run build
