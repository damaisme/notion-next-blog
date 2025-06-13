### Notion Next Blog
Notion Next Blog a modern blogging platform powered by Notion as a headless CMS, built using Next.js App Router. It enables you to manage content directly from Notion while leveraging the performance, scalability, and developer experience of Next.js.

![GitHub stars](https://img.shields.io/github/stars/damaisme/notion-next-blog?style=social)
![GitHub license](https://img.shields.io/github/license/damaisme/notion-next-blog)

![image](https://github.com/user-attachments/assets/178e8e0f-b34c-49e0-a8e4-8d7c3d2c1a52)

## ✨ Platform Features

* **✍️ Write in Notion, Publish on the Web**: A superior writing experience using Notion as your sole CMS. Write, edit, and manage post statuses (`Published`, `Draft`) directly from your Notion database.
* **🚀 Modern Architecture**: Built with Next.js 14+ (App Router) and React Server Components, ensuring incredibly fast rendering performance.
* **🎨 Elegant & Responsive Design**: A clean and readable layout thanks to Tailwind CSS and professional typography styling from `@tailwindcss/typography`.
* **🌗 Light & Dark Mode**: A comfortable reading experience anytime with a seamless Light/Dark mode toggle, powered by `next-themes`.
* **⚡️ Static Performance**: Post and category pages are statically generated (SSG) at build time, making them feel instant to your readers.
* **🗂️ Category & Relation System**:
    * Dynamically displays a list of unique categories based on your posts.
    * Allows visitors to browse posts by category.
    * Supports database relations, ideal for linking posts to an Authors database.
* **📄 Smart Pagination**: Functional "Next" and "Previous" navigation on archive pages to handle a large number of posts.
* **🖼️ Automatic Image Optimization**: Images hosted in Notion are automatically optimized by `next/image` for faster load times.

## 🔧 Tech Stack

* [Next.js](https://nextjs.org/) – React Framework
* [Notion](https://notion.so) – CMS / Database
* [Tailwind CSS](https://tailwindcss.com/) – CSS Framework
* [`@notionhq/client`](https://github.com/makenotion/notion-sdk-js) – Official Notion SDK
* [`notion-to-md`](https://github.com/souvikinator/notion-to-md) – Converts Notion content to Markdown
* [`next-themes`](https://github.com/pacocoursey/next-themes) – For Dark Mode functionality
* [`@heroicons/react`](https://heroicons.com/) – SVG Icons

---

## 🚀 Getting Started

Follow the steps below to deploy and configure this blogging platform for your personal use.

### Prerequisites

* Node.js (v18.17 or later)
* A Notion account


## 🚀 Menyiapkan Platform Anda

Ikuti langkah-langkah di bawah ini untuk men-deploy dan mengkonfigurasi platform blogging ini untuk penggunaan pribadi Anda.

### Prasyarat

* Node.js (v18.17 atau lebih baru)
* Akun Notion

### 1. Clone the Repository

```bash
git clone [https://github.com/damaisme/notion-next-blog.git](https://github.com/damaisme/notion-next-blog.git)
cd notion-next-blog
```
2. Install Dependencies
```Bash

npm install
# or
yarn install
# or
pnpm install
```
3. Set Up Notion
This is the most critical step to connect the platform to your content.

Duplicate the Notion Template: If you don't have one already, duplicate a blog database template into your Notion workspace.
Create a Notion Integration:
Go to the Notion integrations page.
Click "New integration," give it a name (e.g., "My Blog Platform"), and select the appropriate workspace.
Copy your "Internal Integration Token". This is your NOTION_API_KEY.
Get Your Database ID:
Open your Posts database in Notion.
Click the three-dot menu (...) > "Copy link to view".
From the link https://www.notion.so/YOUR_WORKSPACE/DATABASE_ID?v=..., copy your DATABASE_ID.
Connect the Integration to Your Database:
Go back to your database page in Notion, click the three-dot menu (...) > "Add connections" > then select the integration you just created.
4. Set Up Environment Variables
Create a .env.local file in the project root.

.env.local

NOTION_API_KEY="secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
NOTION_DATABASE_ID="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
Replace the placeholder values with your token and database ID.

5. Run the Development Server
Bash

npm run dev
Open http://localhost:3000 in your browser to see your platform running with content from your Notion workspace.

⚙️ Advanced Configuration
Notion Property Names
Ensure the property names in the lib/notion.js file match the property names in your Notion database exactly (e.g., Status, Slug, Publish Date, Category).

Image Domains
To allow next/image to optimize images you upload to Notion, you need to add Notion's file hostname to your next.config.mjs.

next.config.mjs

JavaScript

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com', // Hostname for Notion's files
      },
    ],
  },
};
部署 (Deployment)
This platform is designed to be easily deployed with Vercel.

Push your code to a GitHub repository.
Import your project on Vercel from the GitHub repository.
Add your Environment Variables (NOTION_API_KEY and NOTION_DATABASE_ID) in the Vercel project settings.
Deploy! Your site will be live.
