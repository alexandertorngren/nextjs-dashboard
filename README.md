## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

### Pull/Push schema using `prisma`

```sh
# Pull changes from remote db
> npx prisma db pull

# Push changes to remote db
> npx prisma db push

# Create a migration
> npx prisma migrate dev --name <migration description>
```

### Generate prisma client

```sh
> npx prisma generate
```

### Seed the database

```sh
> npx prisma db seed
```

### Generate types from Supabase

```sh
> supabase gen types typescript --project-id chdqgxrzpsvdrojgetmq > database.types.ts
```

### Generate the file `.env.example`

```sh
> dotenvx ext genexample
```
