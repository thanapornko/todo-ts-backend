import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { ToDoList } from '../entity/Todolist';

export class ToDoController {
  private todoRepository = AppDataSource.getRepository(ToDoList);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.todoRepository.find();
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { title } = request.body;
    console.log(title, '---title---');
    const todo = Object.assign(new ToDoList(), {
      title,
    });
    console.log(todo, '---TODO---');
    return this.todoRepository.save(todo);
  }

  async edit(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const newTitle = request.body.title;
    console.log(id, '--ID--');
    console.log(newTitle, '--new title--');

    try {
      const todo = await this.todoRepository.findOne({
        where: { id: Number(id) },
      });

      if (!todo) {
        return response.status(404).json({ message: 'To-do item not found' });
      }
      todo.title = newTitle;
      console.log(todo, 'TODO');
      return this.todoRepository.save(todo);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;

    let todoToRemove = await this.todoRepository.findOne({
      where: { id: Number(id) },
    });

    if (!todoToRemove) {
      return response.status(404).json({ message: 'To-do item not found' });
    }

    await this.todoRepository.remove(todoToRemove);

    return response
      .status(200)
      .json({ message: 'To-do item has been removed' });
  }
}
