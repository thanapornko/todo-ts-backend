import { ToDoController } from './controller/TodoController';

export const Routes = [
  {
    method: 'get',
    route: '/todos',
    controller: ToDoController,
    action: 'all',
  },
  {
    method: 'post',
    route: '/todos',
    controller: ToDoController,
    action: 'save',
  },
  {
    method: 'put',
    route: '/todos/:id',
    controller: ToDoController,
    action: 'edit',
  },
  {
    method: 'delete',
    route: '/todos/:id',
    controller: ToDoController,
    action: 'remove',
  },
];
