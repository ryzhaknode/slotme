import prisma from '../../prisma/prisma.js';

export const getAllServices = async () => {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
  });
  return services;
};

export const getServiceById = async (id) => {
  const service = await prisma.service.findUnique({
    where: { id },
  });
  return service;
};

export const createService = async ({ name, description, duration, price }) => {
  const service = await prisma.service.create({
    data: { name, description, duration, price },
  });
  return service;
};

export const updateService = async (id, { name, description, duration, price, isActive }) => {
  const service = await prisma.service.update({
    where: { id },
    data: { name, description, duration, price, isActive },
  });
  return service;
};

export const deleteService = async (id) => {
  await prisma.service.delete({
    where: { id },
  });
};


