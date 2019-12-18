# Migration `20191125115905-first-commit`

This migration has been generated by Vincent Poulain at 11/25/2019, 11:59:05 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
  "authUserId" text   ,
  "biography" text NOT NULL DEFAULT '' ,
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "firstname" text NOT NULL DEFAULT '' ,
  "github" text   ,
  "id" text NOT NULL  ,
  "label" text   ,
  "linkedin" text   ,
  "mail" text   ,
  "pictureUrl" text NOT NULL DEFAULT '' ,
  "slug" text NOT NULL DEFAULT '' ,
  "website" text   ,
  "youtube" text   ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."Section" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "id" text NOT NULL  ,
  "index" integer NOT NULL DEFAULT 0 ,
  "name" text NOT NULL DEFAULT '' ,
  "slug" text NOT NULL DEFAULT '' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."Collection" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "detail" text   ,
  "id" text NOT NULL  ,
  "name" text NOT NULL DEFAULT '' ,
  "slug" text NOT NULL DEFAULT '' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."Item" (
  "author" text   ,
  "comment" text   ,
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "description" text   ,
  "id" text NOT NULL  ,
  "imageUrl" text   ,
  "isArchived" boolean NOT NULL DEFAULT false ,
  "meta" text   ,
  "productUrl" text   ,
  "provider" text   ,
  "title" text NOT NULL DEFAULT '' ,
  "type" text NOT NULL DEFAULT 'book' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

ALTER TABLE "public"."Section" ADD COLUMN "owner" text   REFERENCES "public"."User"("id") ON DELETE SET NULL;

ALTER TABLE "public"."Collection" ADD COLUMN "owner" text   REFERENCES "public"."User"("id") ON DELETE SET NULL,
ADD COLUMN "section" text   REFERENCES "public"."Section"("id") ON DELETE SET NULL;

ALTER TABLE "public"."Item" ADD COLUMN "collection" text   REFERENCES "public"."Collection"("id") ON DELETE SET NULL;

CREATE UNIQUE INDEX "User.authUserId" ON "public"."User"("authUserId")

CREATE UNIQUE INDEX "User.slug" ON "public"."User"("slug")

CREATE UNIQUE INDEX "Collection.slug" ON "public"."Collection"("slug")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20191125115905-first-commit
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,77 @@
+generator photon {
+  provider = "photonjs"
+}
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+model User {
+  id          String       @default(cuid()) @id
+  authUserId  String?      @unique
+  slug        String       @unique
+  createdAt   DateTime     @default(now())
+  firstname   String
+  pictureUrl  String
+  biography   String
+  linkedin    String?
+  github      String?
+  mail        String?
+  youtube     String?
+  website     String?
+  label       String?
+  sections    Section[]
+  collections Collection[]
+}
+
+model Section {
+  id          String       @default(cuid()) @id
+  createdAt   DateTime     @default(now())
+  slug        String
+  name        String
+  index       Int          @default(0)
+  collections Collection[]
+  owner       User
+}
+
+model Collection {
+  id        String   @id @default(cuid())
+  createdAt DateTime @default(now())
+  slug      String   @unique
+  name      String
+  detail    String?
+  items     Item[]
+  section   Section
+  owner     User
+}
+
+model Item {
+  id          String      @default(cuid()) @id
+  createdAt   DateTime    @default(now())
+  updatedAt   DateTime    @updatedAt
+  isArchived  Boolean
+  title       String
+  provider    String?
+  author      String?
+  type        ItemType
+  productUrl  String?
+  imageUrl    String?
+  description String?
+  comment     String?
+  collection  Collection?
+  meta        String?     @default("{}")
+}
+
+
+enum ItemType {
+  book
+  album
+  movie
+  video
+  people
+  article
+  podcast
+  website
+  repository
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20191125115905-first-commit)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191125115905-first-commit'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```