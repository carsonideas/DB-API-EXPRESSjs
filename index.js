import express from 'express';

import { PrismaClient } from '@prisma/client';

import { validateMyTasks } from './tasks.js';

const app = express();
app.use(express.json());

const client = new PrismaClient();




app.get('/', (_req, res) => {

  res.send("<h1>HOUSTON !! Welcome to my webpage about tasks! Yikes.........</h1>");

});

console.log("HOUSTON, Are we on! Are we ok!!");

// let port;

// if (process.env.PORT)
// {
//     port = process.env.PORT
// }
// else 
// {
//     port = 4100;
// }

const port = process.env.PORT || 4100;

app.listen(port, () => {

  console.log(`HOUSTON, oooh, yeah!!  The server is up and running on port ${port}! YIKES.........`);
});


app.post('/tasks',validateMyTasks, async (req, res) => {

  try {

    const { title, description } = req.body;

    const tasks = await client.tasks.create({
      data: { 

        title: title, 
        description: description

        // from es6 we dont have to specify the title and content again. it will take it automatically
    }
    });

    res.status(201).json(tasks);
  } catch (e) {

    res.status(500).json({ message: "HOUSTON! something went wrong!! noooo!!!!" })
  }
});

app.get('/tasks', async (req, res) => {
  try {

    const tasks = await client.tasks.findMany({

      where: { isCompleted: false }
    });
    res.status(200).json(tasks);
  } catch (e) {
  
    res.status(500).json({ message: "HOUSTON! something went wrong!! noooo!!!!" })
  }
});

app.get('/tasks/:id', async (req, res) => {

  try {

    const { id } = req.params;
    const tasks = await client.tasks.findFirst({ where: { id } });

    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(404).json({ message: "HOUSTON! Task not foundd!! noooo!!!!" })
    }
  } catch (e) {
   
    res.status(500).json({ message: "HOUSTON! something went wrong!! noooo!!!!" })
  }
});



app.patch('/tasks/:id',validateMyTasks, async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const tasks = await client.tasks.update({
      where: { id },
      data: {
        title: title && title,
        description: description && description
      }
    });

    res.status(200).json(tasks);
  } catch (e) {
    
    res.status(500).json({ message: "HOUSTON! something went wrong!! noooo!!!!" })
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    
    const { id } = req.params;

    await client.tasks.update({
      where: { id },
      data: { 
        isDeleted: true 
    }
    });

    res.status(200).json({ message: "HOUSTON! the task has been deleted successfully..! YIKES.." })

  } catch (e) {
 
    res.status(500).json({ message: "HOUSTON! something went wrong!! noooo!!!!" })
  }
});

