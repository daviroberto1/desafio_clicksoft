'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// Rotas Aluno

Route.post('/createaluno', 'AlunoController.create');

Route.patch('/editaluno/:id', 'AlunoController.edit');

Route.delete('/removealuno/:id', 'AlunoController.remove');

Route.get('/findaluno/:id', 'AlunoController.find');

// Rotas Professor

Route.post('/createprofessor', 'ProfessorController.create');

Route.patch('/editprofessor/:id', 'ProfessorController.edit');

Route.delete('/removeprofessor/:id', 'ProfessorController.remove');

Route.get('/findprofessor/:id', 'ProfessorController.find');

// Rotas Sala

Route.post('/createsala', 'SalaController.create');

Route.patch('/editsala/:id/:professor_id', 'SalaController.edit');

Route.delete('/removesala/:id/:professor_id', 'SalaController.remove');

Route.get('/findsala/:id', 'SalaController.find');

// Rotas cadeiras da sala

Route.post('/allocatealuno/:professor_id', 'CadeiraController.allocate');
Route.delete('/removeallocate/:professor_id/:sala_id/:aluno_id', 'CadeiraController.remove');
Route.get('/findallinsala/:sala_id', 'CadeiraController.findAllInSala');
Route.get('/findallsalas/:aluno_id', 'CadeiraController.findAllSalas');