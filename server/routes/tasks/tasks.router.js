const express = require("express");
const tasksRouter = express.Router();
const { PrismaClient } = require('@prisma/client');
const authenticateJWT = require('./../../auth');
const prisma = new PrismaClient();

tasksRouter.post('/', authenticateJWT, async (req, res) => {
  const { name, dayOfWeek } = req.body;
  const userId = req.user.id;
  try {
      const task = await prisma.task.create({
          data: {
              name,
              dayOfWeek,
              userId,
          },
      }); 
      console.log("success")
      res.status(201).json(task);
  } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
});

tasksRouter.get('/:dayOfWeek', authenticateJWT, async (req, res) => {
    const { dayOfWeek } = req.params;
    const userId = req.user.id;
  
    try {
      const tasks = await prisma.task.findMany({
        where: {
          userId,
          dayOfWeek,
        },
      });
  
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      res.status(500).json({ message: 'Erro ao buscar tarefas' });
    }
});

tasksRouter.delete('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!task || task.userId !== userId) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

tasksRouter.delete('/user/:userId', authenticateJWT, async (req, res) => {
  const userId = req.user.id;

  try {
    await prisma.task.deleteMany({
      where: {
        userId:userId,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting tasks:', error);
    res.status(500).json({ error: 'Failed to delete tasks' });
  }
});

module.exports = tasksRouter;