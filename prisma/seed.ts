import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@email.com',
    role: 'USER',
  },
  {
    name: 'Bob',
    email: 'bob@email.com',
    role: 'USER',
    profile: {
      create: {
        birthdate: new Date('1990-01-01'),
        bio: 'Bob user',
      },
    },
  },
  {
    name: 'Admin',
    email: 'admin@email.com',
    role: 'ADMIN',
    profile: {
      create: {
        birthdate: new Date('1990-01-01'),
        bio: 'Admin user',
        sex: 'MALE',
      },
    },
  },
  {
    name: 'Alexander Torngren',
    email: 'alexander.torngren@drakeanalytics.se',
    role: 'ADMIN',
    profile: {
      create: {
        birthdate: new Date('1991-11-04'),
        bio: 'Hobby programmer and entrepreneur on a mission to make the world a better place.',
        sex: 'MALE',
      },
    },
  },
];

const customerData: Prisma.CustomerCreateInput[] = [
  {
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoiceData: Prisma.InvoiceCreateInput[] = [
  {
    amount: 15795,
    status: 'pending',
    date: new Date('2022-12-06'),
  },
  {
    amount: 20348,
    status: 'pending',
    date: new Date('2022-11-14'),
  },
  {
    amount: 3040,
    status: 'paid',
    date: new Date('2022-10-29'),
  },
  {
    amount: 44800,
    status: 'paid',
    date: new Date('2023-09-10'),
  },
  {
    amount: 34577,
    status: 'pending',
    date: new Date('2023-08-05'),
  },
  {
    amount: 54246,
    status: 'pending',
    date: new Date('2023-07-16'),
  },
  {
    amount: 666,
    status: 'pending',
    date: new Date('2023-06-27'),
  },
  {
    amount: 32545,
    status: 'paid',
    date: new Date('2023-06-09'),
  },
  {
    amount: 1250,
    status: 'paid',
    date: new Date('2023-06-17'),
  },
  {
    amount: 8546,
    status: 'paid',
    date: new Date('2023-06-07'),
  },
  {
    amount: 500,
    status: 'paid',
    date: new Date('2023-08-19'),
  },
  {
    amount: 8945,
    status: 'paid',
    date: new Date('2023-06-03'),
  },
  {
    amount: 1000,
    status: 'paid',
    date: new Date('2022-06-05'),
  },
];

const revenueData: Prisma.RevenueCreateInput[] = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

export async function main() {
  for (const d of userData) {
    await prisma.user.create({ data: d });
  }
  for (const d of customerData) {
    await prisma.customer.create({ data: d });
  }

  for (const d of invoiceData) {
    await prisma.invoice.create({ data: d });
  }

  for (const d of revenueData) {
    await prisma.revenue.create({ data: d });
  }
}

main();
