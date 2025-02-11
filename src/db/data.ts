import { Revenue } from '@/lib/definitions';
import prisma from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import { InvoiceStatus } from '@prisma/client';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export async function fetchRevenue() {
  try {
    const data: Revenue[] = await prisma.revenue.findMany({
      select: {
        month: true,
        revenue: true,
      },
    });

    const result = data.map((item) => {
      const monthNumber = monthNames.indexOf(item.month);
      return {
        ...item,
        monthNumber: monthNumber,
      };
    });

    const sortedResult = result.sort((a, b) => a.monthNumber - b.monthNumber);

    await prisma.$disconnect();
    return sortedResult;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total revenue.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await prisma.invoice.findMany({
      take: 5,
      orderBy: { date: 'desc' },
      select: {
        id: true,
        amount: true,
        customer: true,
      },
    });

    const result = data.map((invoice) => {
      return {
        id: invoice.id,
        name: invoice.customer?.name || 'Unknown',
        image_url: invoice.customer?.image_url || '/customers/evil-rabbit.png',
        email: invoice.customer?.email || 'Unknown',
        amount: formatCurrency(invoice.amount),
      };
    });

    await prisma.$disconnect();
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    const invoiceCountPromise = prisma.invoice.count();
    const customerCountPromise = prisma.customer.count();
    const invoiceStatusPromise = prisma.invoice.groupBy({
      by: ['status'],
      _count: { status: true },
      _sum: { amount: true },
    });

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0] ?? '0');
    const numberOfCustomers = Number(data[1] ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0]._sum.amount ?? 0);
    const totalPendingInvoices = formatCurrency(data[2][1]._sum.amount ?? 0);

    await prisma.$disconnect();
    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await prisma.invoice.findMany({
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: { date: 'desc' },
      where: {
        OR: [
          { customer: { name: { contains: query } } },
          { customer: { email: { contains: query } } },
          { amount: { equals: Number(query) } },
          { date: { equals: new Date(query) } },
          { status: { equals: query as InvoiceStatus } },
        ],
      },
      select: {
        id: true,
        amount: true,
        date: true,
        status: true,
        customer: {
          select: {
            name: true,
            email: true,
            image_url: true,
          },
        },
      },
    });
    await prisma.$disconnect();
    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await prisma.invoice.count({
      where: {
        OR: [
          { customer: { name: { contains: query } } },
          { customer: { email: { contains: query } } },
          { amount: { equals: Number(query) } },
          { date: { equals: new Date(query) } },
          { status: { equals: query as InvoiceStatus } },
        ],
      },
    });
    await prisma.$disconnect();
    return Math.ceil(count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total pages.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      select: {
        id: true,
        amount: true,
        date: true,
        status: true,
        customer: {
          select: {
            name: true,
            email: true,
            image_url: true,
          },
        },
      },
    });
    await prisma.$disconnect();
    return invoice;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    await prisma.$disconnect();
    return customers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        invoices: true,
      },
    });

    const result = customers.map((customer) => {
      const totalInvoices = customer.invoices.length;
      const totalPending = customer.invoices
        .filter((invoice) => invoice.status === 'pending')
        .reduce((sum, invoice) => sum + invoice.amount, 0);
      const totalPaid = customer.invoices
        .filter((invoice) => invoice.status === 'paid')
        .reduce((sum, invoice) => sum + invoice.amount, 0);

      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
        total_invoices: totalInvoices,
        total_pending: formatCurrency(totalPending),
        total_paid: formatCurrency(totalPaid),
      };
    });
    await prisma.$disconnect();
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}
