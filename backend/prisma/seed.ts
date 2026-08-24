import { PrismaClient, UserRole, UserStatus, VehicleCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting 3altayer database seeding...');

  // 1. Seed Pricing Rules (Egypt - EGP)
  console.log('Seeding Pricing Rules in EGP...');
  const pricingData = [
    { category: VehicleCategory.ECONOMY, baseFare: 18, pricePerKm: 5.0, pricePerMinute: 0.5, minimumFare: 25, instantCommPct: 15, biddingCommPct: 10 },
    { category: VehicleCategory.COMFORT, baseFare: 28, pricePerKm: 7.0, pricePerMinute: 0.8, minimumFare: 40, instantCommPct: 15, biddingCommPct: 10 },
    { category: VehicleCategory.SCOOTER, baseFare: 12, pricePerKm: 3.5, pricePerMinute: 0.3, minimumFare: 18, instantCommPct: 15, biddingCommPct: 10 },
    { category: VehicleCategory.TOKTOK, baseFare: 10, pricePerKm: 3.0, pricePerMinute: 0.3, minimumFare: 15, instantCommPct: 15, biddingCommPct: 10 },
  ];

  for (const p of pricingData) {
    await prisma.pricingRule.upsert({
      where: { category: p.category },
      create: p,
      update: p,
    });
  }

  // 2. Seed Admin User
  console.log('Seeding Super Admin...');
  const admin = await prisma.user.upsert({
    where: { phoneNumber: '+201000000000' },
    create: {
      phoneNumber: '+201000000000',
      fullName: 'مدير النظام (Admin)',
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      wallet: { create: { balance: 0.0 } },
    },
    update: {},
  });

  // 3. Seed Sample Riders
  console.log('Seeding Riders in Cairo...');
  const riders = [
    { phone: '+201011111111', name: 'أحمد سالم (زبون)' },
    { phone: '+201022222222', name: 'سارة إبراهيم (زبونة)' },
  ];

  for (const r of riders) {
    await prisma.user.upsert({
      where: { phoneNumber: r.phone },
      create: {
        phoneNumber: r.phone,
        fullName: r.name,
        role: UserRole.RIDER,
        status: UserStatus.ACTIVE,
        wallet: { create: { balance: 250.0 } }, // 250 EGP initial wallet credit
      },
      update: {},
    });
  }

  // 4. Seed Sample Verified Drivers & Vehicles
  console.log('Seeding Captains in Cairo...');
  const drivers = [
    {
      phone: '+201033333333',
      name: 'محمود السيد (كابتن)',
      nationalId: '29001010101011',
      category: VehicleCategory.ECONOMY,
      make: 'Toyota',
      model: 'Corolla 2022',
      plate: 'أ ب ج 1234',
      rating: 4.9,
      trips: 340,
    },
    {
      phone: '+201044444444',
      name: 'كريم عبد الله (سكوتر)',
      nationalId: '29502020202022',
      category: VehicleCategory.SCOOTER,
      make: 'Benelli',
      model: 'TNT 150',
      plate: 'س ص ع 5678',
      rating: 5.0,
      trips: 185,
    },
    {
      phone: '+201055555555',
      name: 'أحمد فؤاد (كومفورت)',
      nationalId: '28803030303033',
      category: VehicleCategory.COMFORT,
      make: 'Hyundai',
      model: 'Elantra CN7',
      plate: 'ط ك ل 9101',
      rating: 4.8,
      trips: 512,
    },
  ];

  for (const d of drivers) {
    const user = await prisma.user.upsert({
      where: { phoneNumber: d.phone },
      create: {
        phoneNumber: d.phone,
        fullName: d.name,
        role: UserRole.DRIVER,
        status: UserStatus.ACTIVE,
        wallet: { create: { balance: 140.0 } }, // 140 EGP initial wallet balance
      },
      update: {},
    });

    const driverProfile = await prisma.driverProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        nationalId: d.nationalId,
        isVerified: true,
        isOnline: true,
        ratingAvg: d.rating,
        totalTrips: d.trips,
      },
      update: {
        isVerified: true,
        isOnline: true,
      },
    });

    await prisma.vehicle.upsert({
      where: { driverId: driverProfile.id },
      create: {
        driverId: driverProfile.id,
        category: d.category,
        make: d.make,
        model: d.model,
        year: 2022,
        color: 'فضي',
        plateNumber: d.plate,
      },
      update: {},
    });
  }

  console.log('✅ 3altayer Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
