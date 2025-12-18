/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw';
import { products } from './data';
import { paginate, avgRating } from './utils';

const API = '/api';

/* =========================
   MOCK CONFIG
   ========================= */

// 🔁 Toggle this when you WANT fake orders
const USE_MOCK_ORDERS = false;

/* =========================
   MOCK USER & ORDERS DATA
   ========================= */

let mockProfile = {
  id: 'u1',
  username: 'john_doe',
  email: 'john@shop.com',
  fullName: 'John Doe',
  defaultAddress: {
    street: '10 Rue de Paris',
    city: 'Paris',
    zip: '75001',
  },
  preferences: {
    newsletter: true,
    defaultMinRating: 4,
  },
};

// 🔒 Kept for testing purposes (NOT used by default)
const mockOrders = [
  {
    id: '1001',
    date: '2024-11-01',
    status: 'livrée',
    total: 1120,
  },
  {
    id: '1002',
    date: '2024-12-10',
    status: 'expédiée',
    total: 71,
  },
];

const mockOrderDetails: Record<string, any> = {
  '1001': {
    id: '1001',
    date: '2024-11-01',
    status: 'livrée',
    items: [
      {
        product: { id: 1, name: 'Laptop', price: 1000 },
        quantity: 1,
      },
    ],
    subtotal: 1000,
    taxes: 100,
    shipping: 20,
    total: 1120,
    address: mockProfile.defaultAddress,
  },

  '1002': {
    id: '1002',
    date: '2024-12-10',
    status: 'expédiée',
    items: [
      {
        product: { id: 2, name: 'Mouse', price: 30 },
        quantity: 2,
      },
    ],
    subtotal: 60,
    taxes: 6,
    shipping: 5,
    total: 71,
    address: mockProfile.defaultAddress,
  },
};

/* =========================
   HANDLERS
   ========================= */

export const handlers = [
  /* =========================
     AUTH
     ========================= */

  http.post(`${API}/auth/token/`, async () => {
    return HttpResponse.json(
      {
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
      },
      { status: 200 }
    );
  }),

  http.post(`${API}/auth/token/refresh/`, async () => {
    return HttpResponse.json(
      { access: 'mock-access-token-refreshed' },
      { status: 200 }
    );
  }),

  /* =========================
     PRODUCTS
     ========================= */

  http.get(`${API}/products/`, async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const page_size = Number(url.searchParams.get('page_size') || '10');
    const min_rating = Number(url.searchParams.get('min_rating') || '0');
    const ordering = url.searchParams.get('ordering') || '-created_at';

    const rows = products
      .map((p) => ({ ...p, _avg: avgRating(p.ratings) }))
      .filter((p) => p._avg >= min_rating);

    const sign = ordering.startsWith('-') ? -1 : 1;
    const key = ordering.replace(/^-/, '');
    rows.sort(
      (a: any, b: any) =>
        (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) * sign
    );

    const { count, results } = paginate(rows, page, page_size);

    return HttpResponse.json(
      { count, next: null, previous: null, results },
      { status: 200 }
    );
  }),

  http.get(`${API}/products/:id`, async ({ params }) => {
    const id = Number(params['id']);
    const p = products.find((x) => x.id === id);

    if (!p) {
      return HttpResponse.json({ detail: 'Not found.' }, { status: 404 });
    }

    return HttpResponse.json(
      { ...p, _avg: avgRating(p.ratings) },
      { status: 200 }
    );
  }),

  http.get(`${API}/products/:id/rating/`, async ({ params }) => {
    const id = Number(params['id']);
    const p = products.find((x) => x.id === id);

    if (!p) {
      return HttpResponse.json({ detail: 'Not found.' }, { status: 404 });
    }

    return HttpResponse.json(
      {
        product_id: id,
        avg_rating: avgRating(p.ratings),
        count: p.ratings.length,
      },
      { status: 200 }
    );
  }),

  /* =========================
     USER / ACCOUNT
     ========================= */

  http.get(`${API}/me`, () => {
    return HttpResponse.json(mockProfile, { status: 200 });
  }),

  http.patch(`${API}/me`, async ({ request }) => {
    const changes = (await request.json()) as Partial<typeof mockProfile>;

    mockProfile = {
      ...mockProfile,
      ...changes,
      preferences: {
        ...mockProfile.preferences,
        ...(changes.preferences ?? {}),
      },
    };

    return HttpResponse.json(mockProfile, { status: 200 });
  }),

  http.get(`${API}/me/orders`, () => {
    return HttpResponse.json(
      USE_MOCK_ORDERS ? mockOrders : [],
      { status: 200 }
    );
  }),

  http.get(`${API}/orders/:id`, ({ params }) => {
    const id = params['id'] as string;
    const order = mockOrderDetails[id];

    if (!order) {
      return HttpResponse.json({ detail: 'Not found.' }, { status: 404 });
    }

    return HttpResponse.json(order, { status: 200 });
  }),

  /* =========================
     PROMO CODES
     ========================= */

  http.post(`${API}/cart/apply-promo/`, async ({ request }) => {
    const body = (await request.json()) as {
      items: Array<{
        product: { price: number };
        quantity: number;
      }>;
      code: string;
    };

    const { items, code } = body;

    const itemsTotal = items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );

    let discount = 0;
    let shipping = 10;
    const taxes = Math.round(itemsTotal * 0.2);
    const appliedPromos: string[] = [];

    if (code === 'WELCOME10') {
      discount = Math.round(itemsTotal * 0.1);
      appliedPromos.push(code);
    } else if (code === 'FREESHIP') {
      shipping = 0;
      appliedPromos.push(code);
    } else if (code === 'VIP20') {
      if (itemsTotal < 200) {
        return HttpResponse.json(
          { message: 'VIP20 requires minimum 200€' },
          { status: 400 }
        );
      }
      discount = Math.round(itemsTotal * 0.2);
      appliedPromos.push(code);
    } else {
      return HttpResponse.json(
        { message: 'Invalid promo code' },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      itemsTotal,
      discount,
      shipping,
      taxes,
      grandTotal: itemsTotal - discount + shipping + taxes,
      appliedPromos,
    });
  }),

  /* =========================
     ADMIN – ADD PRODUCT ✅
     ========================= */

  http.post(`${API}/admin/products/`, async ({ request }) => {
  const body = (await request.json()) as {
    name: string;
    price: number;
    owner_id?: number;
  };

  if (!body?.name || typeof body.price !== 'number' || body.price <= 0) {
    return HttpResponse.json({ message: 'Invalid product data' }, { status: 400 });
  }

  // choose a default owner for admin-created products
  const ownerId = typeof body.owner_id === 'number' ? body.owner_id : 1;

  const nextId = products.length
    ? Math.max(...products.map((p: any) => p.id)) + 1
    : 1;

  const newProduct = {
    id: nextId,
    name: body.name,
    price: body.price,
    created_at: new Date().toISOString().split('T')[0],
    owner_id: ownerId,      // ✅ REQUIRED
    ratings: [],
    _avg: null,
  };

  // If products is readonly in TS, keep the productsDb approach.
  // If you already created productsDb, use: productsDb.unshift(newProduct);
  (products as any[]).unshift(newProduct);

  return HttpResponse.json(newProduct, { status: 201 });
}),

  /* =========================
     ADMIN DASHBOARD
     ========================= */

  http.get(`${API}/admin/stats/`, () => {
    return HttpResponse.json(
      {
        totalUsers: 128,
        totalOrders: 342,
        totalRevenue: 18450,

        topProducts: [
          { productId: '1', name: 'Laptop', sold: 54, revenue: 54000 },
          { productId: '2', name: 'Smartphone', sold: 81, revenue: 32400 },
          { productId: '3', name: 'Headphones', sold: 120, revenue: 9600 },
        ],

        recentOrders: [
          {
            id: 'ORD-1005',
            user: 'john_doe',
            total: 1200,
            createdAt: '2025-11-24',
            status: 'delivered',
          },
          {
            id: 'ORD-1006',
            user: 'alice',
            total: 75,
            createdAt: '2025-11-25',
            status: 'shipped',
          },
          {
            id: 'ORD-1007',
            user: 'bob',
            total: 340,
            createdAt: '2025-11-26',
            status: 'pending',
          },
        ],
      },
      { status: 200 }
    );
  }),
];
