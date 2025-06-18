import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create a merchant
  const merchantPassword = await bcrypt.hash("merchant123", 10)
  const merchant = await prisma.user.create({
    data: {
      email: "merchant@example.com",
      password: merchantPassword,
      name: "Test Merchant",
      role: "MERCHANT",
    },
  })

  // Create a company
  const company = await prisma.company.create({
    data: {
      name: "Test Company",
      industry: "Technology",
      size: 50,
      address: "123 Test St",
      contactEmail: "contact@testcompany.com",
      contactPhone: "123-456-7890",
      merchantId: merchant.id,
    },
  })

  // Create an employee
  const employeePassword = await bcrypt.hash("employee123", 10)
  const employee = await prisma.user.create({
    data: {
      email: "employee@example.com",
      password: employeePassword,
      name: "Test Employee",
      role: "EMPLOYEE",
      companyId: company.id,
    },
  })

  // Create a partner
  const partnerPassword = await bcrypt.hash("partner123", 10)
  const partner = await prisma.user.create({
    data: {
      email: "partner@example.com",
      password: partnerPassword,
      name: "Test Partner",
      role: "PARTNER",
    },
  })

  // Create a wellness service
  const service = await prisma.service.create({
    data: {
      name: "Yoga Class",
      description: "Relaxing yoga session for beginners",
      duration: 60,
      price: 50,
      category: "Fitness",
      maxParticipants: 10,
      location: "Studio A",
      availability: [
        {
          dayOfWeek: 1,
          startTime: "09:00",
          endTime: "17:00",
        },
        {
          dayOfWeek: 3,
          startTime: "09:00",
          endTime: "17:00",
        },
        {
          dayOfWeek: 5,
          startTime: "09:00",
          endTime: "17:00",
        },
      ],
      partnerId: partner.id,
    },
  })

  console.log("Database initialized with test data:")
  console.log("Merchant:", merchant.email)
  console.log("Employee:", employee.email)
  console.log("Partner:", partner.email)
  console.log("Company:", company.name)
  console.log("Service:", service.name)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 