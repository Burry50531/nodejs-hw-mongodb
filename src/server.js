import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js';
const PORT = getEnvVar('PORT', '3000');
export const setupServer = () => {
  const app = express();
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.error(error);
    }
  });
  app.get('/contacts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await getContactById(id);
      if (!contact) {
        return res.status(404).send({ message: 'Contact not found' });
      }
      res.status(200).json({
        message: `Successfully found contact with id ${id}!`,
        data: contact,
      });
    } catch (error) {
      console.error(error);
    }
  });
  app.use((req, res, next) => {
    res.status(404).send({ message: 'Contact not found' });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};