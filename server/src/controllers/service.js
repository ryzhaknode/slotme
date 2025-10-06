import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllServices as getAllServicesSvc,
  getServiceById as getServiceByIdSvc,
  createService as createServiceSvc,
  updateService as updateServiceSvc,
  deleteService as deleteServiceSvc,
} from '../services/service.js';

const getAllServicesHandler = async (req, res) => {
  const services = await getAllServicesSvc();
  res.json({
    status: 'success',
    code: 200,
    data: services
  });
};

const getServiceByIdHandler = async (req, res) => {
  const { id } = req.params;
  const service = await getServiceByIdSvc(id);

  if (!service) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Service not found'
    });
  }

  res.json({
    status: 'success',
    code: 200,
    data: service
  });
};

const createServiceHandler = async (req, res) => {
  const { name, description, duration, price } = req.body;
  const service = await createServiceSvc({ name, description, duration, price });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: service
  });
};

const updateServiceHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description, duration, price, isActive } = req.body;
  const service = await updateServiceSvc(id, { name, description, duration, price, isActive });

  res.json({
    status: 'success',
    code: 200,
    data: service
  });
};

const deleteServiceHandler = async (req, res) => {
  const { id } = req.params;
  await deleteServiceSvc(id);

  res.json({
    status: 'success',
    code: 200,
    message: 'Service deleted successfully'
  });
};

export const getAllServices = ctrlWrapper(getAllServicesHandler);
export const getServiceById = ctrlWrapper(getServiceByIdHandler);
export const createService = ctrlWrapper(createServiceHandler);
export const updateService = ctrlWrapper(updateServiceHandler);
export const deleteService = ctrlWrapper(deleteServiceHandler);
